const { spawn } = require('child_process');

async function main() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1280,900',
    '--disable-gpu',
    'http://localhost:3000'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://localhost:9222/json');
  const targets = await res.json();
  const pageTarget = targets.find((t) => t.type === 'page' && t.url.includes('localhost:3000'));
  
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  const consoleLogs = [];
  const networkEvents = [];
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Network.responseReceived') {
      networkEvents.push({ url: msg.params.response.url, status: msg.params.response.status });
    }
    if (msg.method === 'Network.loadingFailed') {
      networkEvents.push({ url: msg.params.url, errorText: msg.params.errorText });
    }
    if (msg.method === 'Console.messageAdded') {
      consoleLogs.push(msg.params.message);
    }
    if (msg.method === 'Runtime.consoleAPICalled') {
      consoleLogs.push({ type: msg.params.type, args: msg.params.args });
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      consoleLogs.push({ type: 'EXCEPTION', details: msg.params.exceptionDetails });
    }
    if (msg.id && callbacks.has(msg.id)) {
      callbacks.get(msg.id)(msg);
      callbacks.delete(msg.id);
    }
  };

  ws.onopen = async () => {
    await send('Network.enable');
    await send('Runtime.enable');
    await send('Console.enable');
    await send('Page.enable');

    // Reload page to capture all lifecycle errors
    await send('Page.reload');
    await new Promise((r) => setTimeout(r, 4000));

    const checkHydration = await send('Runtime.evaluate', {
      expression: `
        (function() {
          const section = document.getElementById('custom-cakes');
          const buttons = Array.from(section.querySelectorAll('button'));
          const firstBtn = buttons[0];
          const fiberKey = firstBtn ? Object.keys(firstBtn).find(k => k.startsWith('__reactFiber$')) : null;
          const propsKey = firstBtn ? Object.keys(firstBtn).find(k => k.startsWith('__reactProps$')) : null;
          
          return {
            buttonCount: buttons.length,
            firstButtonText: firstBtn?.textContent?.trim(),
            fiberKey: fiberKey || 'NOT_FOUND',
            propsKey: propsKey || 'NOT_FOUND',
            onClickType: (propsKey && firstBtn[propsKey]) ? typeof firstBtn[propsKey].onClick : 'NO_PROPS',
            windowNext: typeof window.__NEXT_DATA__,
            documentScripts: Array.from(document.scripts).map(s => s.src).filter(Boolean)
          };
        })()
      `,
      returnByValue: true
    });

    console.log('FIBER_CHECK:\n', JSON.stringify(checkHydration.result?.result?.value, null, 2));

    const fullTest = await send('Runtime.evaluate', {
      expression: `
        (async function() {
          const results = [];
          const section = document.getElementById('custom-cakes');
          if (!section) return { error: 'Section #custom-cakes not found' };

          function findBtn(text) {
            return Array.from(section.querySelectorAll('button')).find(b => (b.innerText || b.textContent || '').includes(text));
          }

          // Step 1: Initial state check
          const initialSponge = section.querySelector('strong.text-brand-chocolate')?.textContent?.trim();
          results.push({ test: 'Initial Sponge', value: initialSponge, pass: initialSponge === 'Belgian Dark Chocolate' });

          // Select Red Velvet
          const redVelvetBtn = findBtn('Crimson Red Velvet');
          if (!redVelvetBtn) return { error: 'Crimson Red Velvet button not found', results };
          redVelvetBtn.click();
          await new Promise(r => setTimeout(r, 300));

          const afterRedVelvet = section.querySelector('strong.text-brand-chocolate')?.textContent?.trim();
          results.push({ test: 'Select Red Velvet', value: afterRedVelvet, pass: afterRedVelvet === 'Crimson Red Velvet' });

          // Continue to Filling
          const continueToFillingBtn = findBtn('Continue to Filling');
          if (!continueToFillingBtn) return { error: 'Continue to Filling button not found', results };
          continueToFillingBtn.click();
          await new Promise(r => setTimeout(r, 300));

          const hasStep2Title = section.textContent.includes('Select Your Luscious Filling');
          results.push({ test: 'Navigate to Step 2', pass: hasStep2Title });

          // Select Salted Caramel in Step 2
          const caramelBtn = findBtn('Salted Caramel & Nut Praline');
          if (!caramelBtn) {
            return {
              error: 'Salted Caramel button not found in Step 2',
              buttonsFound: Array.from(section.querySelectorAll('button')).map(b => b.textContent?.trim()),
              results
            };
          }
          caramelBtn.click();
          await new Promise(r => setTimeout(r, 300));

          // Continue to Theme
          const continueToThemeBtn = findBtn('Continue to Theme');
          if (!continueToThemeBtn) return { error: 'Continue to Theme button not found', results };
          continueToThemeBtn.click();
          await new Promise(r => setTimeout(r, 300));

          const hasStep3Title = section.innerText.includes('Select Your Occasion Theme & Decor');
          results.push({ test: 'Navigate to Step 3', pass: hasStep3Title });

          // Select Kids Playful Theme in Step 3
          const kidsBtn = findBtn("Kids' Playful Theme");
          kidsBtn.click();
          await new Promise(r => setTimeout(r, 100));

          // Continue to Blueprint Review
          findBtn('Review Cake Blueprint').click();
          await new Promise(r => setTimeout(r, 100));

          const hasStep4Title = section.innerText.includes('Your Custom Cake Blueprint');
          results.push({ test: 'Navigate to Step 4', pass: hasStep4Title });

          // Verify configured items in Step 4
          const reviewItems = Array.from(section.querySelectorAll('.rounded-2xl strong.text-brand-chocolate')).map(el => el.innerText);
          results.push({
            test: 'Step 4 Items Match Selections',
            items: reviewItems,
            pass: reviewItems.includes('Crimson Red Velvet') &&
                  reviewItems.includes('Salted Caramel & Nut Praline') &&
                  reviewItems.includes("Kids' Playful Theme")
          });

          // Test Reference Section Tab Switching
          const aiTabBtn = findBtn('Option B: AI Concept');
          if (aiTabBtn) {
            aiTabBtn.click();
            await new Promise(r => setTimeout(r, 200));
            const hasAiPlaceholder = section.textContent.includes('Generate My Cake Concept with AI');
            results.push({ test: 'AI Tab Switch', pass: hasAiPlaceholder });

            const uploadTabBtn = findBtn('Option A: Upload Reference');
            uploadTabBtn.click();
            await new Promise(r => setTimeout(r, 200));
            const hasUploadGuidance = section.textContent.includes('Click to choose an inspiration photo from your device');
            results.push({ test: 'Upload Tab Switch', pass: hasUploadGuidance });
          } else {
            results.push({ test: 'AI Tab Switch', pass: false, note: 'AI Tab button not found' });
          }

          // Verify WhatsApp Link
          const whatsappBtn = Array.from(section.querySelectorAll('a')).find(a => a.href && a.href.includes('wa.me'));
          const decodedHref = whatsappBtn ? decodeURIComponent(whatsappBtn.href) : '';
          results.push({
            test: 'WhatsApp Brief Payload Integrity',
            pass: decodedHref.includes('Crimson Red Velvet') &&
                  decodedHref.includes('Salted Caramel & Nut Praline') &&
                  decodedHref.includes("Kids' Playful Theme"),
            urlFound: Boolean(whatsappBtn)
          });

          // Test "Change Filling" button from Step 4
          const changeFillingBtn = findBtn('Change Filling');
          changeFillingBtn.click();
          await new Promise(r => setTimeout(r, 100));

          const backInStep2 = section.innerText.includes('Select Your Luscious Filling');
          results.push({ test: 'Change Filling navigates to Step 2', pass: backInStep2 });

          // Change to Philadelphia Cream Cheese
          const creamCheeseBtn = findBtn('Philadelphia Cream Cheese Frosting');
          creamCheeseBtn.click();
          await new Promise(r => setTimeout(r, 100));

          // Jump directly to Step 4 via step indicator "04"
          const step4Indicator = Array.from(section.querySelectorAll('button')).find(b => b.innerText.includes('04'));
          step4Indicator.click();
          await new Promise(r => setTimeout(r, 100));

          const updatedItems = Array.from(section.querySelectorAll('.rounded-2xl strong.text-brand-chocolate')).map(el => el.innerText);
          results.push({
            test: 'Updated Filling reflected in Step 4',
            items: updatedItems,
            pass: updatedItems.includes('Philadelphia Cream Cheese Frosting')
          });

          // Test Start Over button
          const startOverBtn = findBtn('Start Over');
          startOverBtn.click();
          await new Promise(r => setTimeout(r, 100));

          const backInStep1 = section.innerText.includes('Select Your Sponge Base');
          const resetSponge = section.querySelector('strong.text-brand-chocolate')?.innerText;
          results.push({
            test: 'Start Over resets to Step 1 default',
            pass: backInStep1 && resetSponge === 'Belgian Dark Chocolate'
          });

          return results;
        })()
      `,
      awaitPromise: true,
      returnByValue: true
    });

    console.log('FULL_TEST_RESPONSE:\n', JSON.stringify(fullTest, null, 2));
    if (fullTest.result?.result?.value) {
      console.log('RESULTS:\n', JSON.stringify(fullTest.result.result.value, null, 2));
    }

    console.log('NETWORK_EVENTS:\n', JSON.stringify(networkEvents.filter(e => e.status !== 200 || e.errorText), null, 2));
    console.log('BROWSER_CONSOLE_LOGS:\n', JSON.stringify(consoleLogs, null, 2));

    ws.close();
    edge.kill();
    process.exit(0);
  };
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
