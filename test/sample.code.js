const { expect } = require('chai');
var chai = require('chai')
	, chaiHttp = require('chai-http');

chai.use(chaiHttp);
var URL="";
var playstore_url="";
var appstore_url="";
var app_name="";
var welcome_text="";
if(process.argv[9]=="ms" || process.argv[9]=="MS" || process.argv[9]=="" || process.argv[9]==null){
	URL="https://ms.healthline.com";
if(process.argv[10]=="stage" || process.argv[10]=="STAGE"){
	URL="https://together-msb-stage-web.healthline.com";
}
playstore_url="https://play.google.com/store/apps/details?id=com.healthline.msbuddy";
appstore_url="https://apps.apple.com/us/app/id1040195462?mt=8";
app_name="MSB";
welcome_text="Multiple Sclerosis Community";
}
if(process.argv[9]=="BC" || process.argv[9]=="bc"){
	URL="https://bc.healthline.com";
	if(process.argv[10]=="stage" || process.argv[10]=="STAGE"){
		URL="https://together-bch-stage-web.healthline.com";
	}
	playstore_url="https://play.google.com/store/apps/details?id=com.healthline.breastcancer";
	appstore_url="https://apps.apple.com/US/app/id1356340700?mt=8";
	app_name="BCH";
	welcome_text="Breast Cancer Community";
}
if(process.argv[9]=="mg" || process.argv[9]=="MG"){
	URL="https://migraine.healthline.com";
	if(process.argv[10]=="stage" || process.argv[10]=="STAGE"){
		URL="https://together-mig-stage-web.healthline.com";
	}
	playstore_url="https://play.google.com/store/apps/details?id=com.healthline.mig";
	appstore_url="https://apps.apple.com/US/app/id1494062954?mt=8";
	app_name="Migraine";
	welcome_text="Migraine Community";
}
if(process.argv[9]=="ibd" || process.argv[9]=="IBD"){
	URL="https://ibd.healthline.com";
	if(process.argv[10]=="stage" || process.argv[10]=="STAGE"){
		URL="https://together-ibd-stage-web.healthline.com";
	}
	playstore_url="https://play.google.com/store/apps/details?id=com.healthline.ibd";
	appstore_url="https://apps.apple.com/US/app/id1459294732?mt=8";
	app_name="IBD";
	welcome_text="IBD Community";
}
if(process.argv[9]=="t2d" || process.argv[9]=="T2D"){
	URL="https://t2d.healthline.com";
	if(process.argv[10]=="stage" || process.argv[10]=="STAGE"){
		URL="https://together-t2d-stage-web.healthline.com";
	}
	playstore_url="https://play.google.com/store/apps/details?id=com.healthline.t2d";
	appstore_url="https://apps.apple.com/US/app/id1498858311?mt=8";
	app_name="T2D";
	welcome_text="Type 2 Diabetes Community";
}
if(process.argv[9]=="ra" || process.argv[9]=="RA"){
	URL="https://ra.healthline.com";
	if(process.argv[10]=="stage" || process.argv[10]=="STAGE"){
		URL="https://together-ra-stage-web.healthline.com";
	}
	playstore_url="https://play.google.com/store/apps/details?id=com.healthline.ra";
	appstore_url="https://apps.apple.com/US/app/id1498862311?mt=8";
	app_name="RA";
	welcome_text="Rheumatoid Arthritis Community";
}

describe(app_name+' Web Home page', async () => { // Started to new test-suit
	let page;

	before(async () => { /* Before hook for mocha testing, This code will be executed before each testcases */
		page = await browser.newPage(); // Opened new tab 
		//page.on('console', consoleObj => console.log(consoleObj.text())); // To display console log inside evaluate function
		console.log(URL+"  ********* ");
		await page.goto(URL,{
			waitUntil: 'networkidle2',
			// Remove the timeout
			timeout: 0
		});
	});

	after(async function () { /* After hook for mocah testing, This code will be executed after each testcases */ 
		await page.close();
	});

	it('TC-1112 *** Accept cookies and click on more information', async () => {
		var messages = []; // Declared messages array to hold the errors
		try { // Try for privecy popup

			// Waited for app-prvary tag to load
			await page.waitForSelector("app-privacy", {
				visible: true,
			  });
		    const privacyPopup = await page.$("app-privacy");  //locate app privacy pop-up
			try { 
				await page.waitForSelector("shadow/div.privacy-message-button-container", {
					visible: true,
				  });
				const container = await page.$("shadow/div.privacy-message-button-container");
				//waited for accept button to load
				await page.waitForSelector("shadow/together-button", {
					visible: true,
				  });
				

				//located ACCEPT button
		        const acceptBtn = await container.$$("shadow/together-button");
				await acceptBtn[0].click();  // Clicked ACCEPT button
			} catch (e) {
				// Error will be catch here if element for 'ACCEPT' button is not located, then adding error message to messages
				messages.push("Unable to locate 'Aceept' button from privacy policy popup");
			}
	
			
		} catch (e) {
			// Error will be catch here if element for 'Privacy Policy Popup' is not located, then adding error message to messages
			messages.push("Privacy policy popup not displaying when cookie is cleared from the browser");
		}

		errormsg="";
		messages.forEach(function (item) {
			errormsg = errormsg + " " + item + "\n";
		});
	
		// Assertion for error message
		expect(errormsg).to.equal('')
		});

		it('TC-996 *** Locate Live discussion group,  drill down to the group, scroll and locate "See all replies..."', async () => {
			var messages = []; // Declared messages array to hold the errors
		try { // Try for Live Discussion group
			await page.waitForSelector("shadow/ion-router-link:nth-child(4) > together-group-list-item", {
				visible: true,
			  });
			//const buttonHandle=await page.$("shadow/ion-router-link:nth-child(4) > together-group-list-item");
			const buttons=await page.$$("shadow/ion-router-link");
			//page.evaluate(el => el.click(), buttonHandle);
			console.log(buttons.length);
			let buttonHandle=null;
			for (i = 3; i < buttons.length-2; i++) {
			const buttonHandler=await buttons[i].$("shadow/together-group-list-item");
			buttonHandle=await buttons[i].$("shadow/.group-list-item-label");
			
			const btnTxt = await page.evaluate(buttonHandle => buttonHandle.innerText, buttonHandle);
			console.log(btnTxt);
			if(String(btnTxt).indexOf("Live Discussions")!==-1){
			break;
			}
			}
	
			await buttonHandle.click();
			await page.waitForSelector("app-group", {
				visible: true,
			  });
			const groupPage=await page.$("app-group");
			await page.waitForSelector("shadow/together-group-title .group-title-label", {
				visible: true,
			  });
			// Located group channel title
			const titleBox=await groupPage.$("shadow/together-group-title .group-title-label");
			await page.waitForSelector("shadow/.group-title-label:not(:empty)", {
				visible: true,
			  });
			const groupChannelTitle=await groupPage.$("shadow/.group-title-label");
			// Located groupTitleText
			const groupTitleTxt = await page.evaluate(groupChannelTitle => groupChannelTitle.innerText, groupChannelTitle);
					console.log("Group Channel Title -->" + groupTitleTxt);
					if (String(groupTitleTxt).indexOf("Live Discussions") == -1) {
						messages.push("User not enters into Group Channel page on clicking 'Live Discussions' from left navigation on "+app_name+" Web Home Page");
					}
			try {
				/*
				await page.evaluate(_ => {
					// To scroll the page upto Learn More
					tstt=document.querySelector("app-group").shadowRoot.querySelector("ion-content").shadowRoot.querySelector("main");
					 tstt.scrollTop=6500; // For scrolling at specific place
					});
				*/
				await page.waitForSelector("shadow/.app-group-comment together-reply", {
					visible: true,
				  });
				const SeeAllLnks = await groupPage.$$("shadow/.app-group-comment together-reply");
			
				console.log(SeeAllLnks.length);
				var i;
				for (i = 0; i < SeeAllLnks.length; i++) {
					try{
						const SeeAllLnk = await SeeAllLnks[i].$("shadow/.more-link");
						//page.evaluate(el => el.click(), SeeAllLnk);
						await SeeAllLnk.click();
						console.log("See all Comments clicked...");
						break;
					} catch (e) {
						console.log(" ******** --> "+e);
						}
				}
			await page.waitForSelector("shadow/together-comment", {
					visible: true,
				  });
			const comments=await page.$$("shadow/together-comment");
			if(comments.length<=1){
				messages.push("On All Replies page only one comment");
			}
			try { 
				// Click back link from All Replies screen
				await page.waitForSelector("shadow/.thread-title-link-label", {
					visible: true,
				  });
				const backLnk = await page.$("shadow/.thread-title-link-label");
				const lnkTxt1 = await page.evaluate(backLnk => backLnk.innerText, backLnk);
				console.log(lnkTxt1);
				await backLnk.click();
				console.log("back is clicked");
			} catch (e) {
				console.log(e);
				// Error will be catch here if element for 'Back' link is not located, then adding error message to messages
				messages.push("Back Link is missing on All Replies screern");
			}
		} catch (e) {
			console.log(e);
			// Error will be catch here if element for 'See all replies' is not located, then adding error message to messages
			messages.push("Unable to locate 'See all replies' Link from thread on Group Channel page");
		}
	
			try {
				await page.waitForSelector("shadow/ion-router-link:nth-child(1) > together-nav-item", {
					visible: true,
				  });
				// Located Home link
				const homePageHandle=await page.$("shadow/ion-router-link:nth-child(1) > together-nav-item");
				await homePageHandle.click(); // Clicked on Home link
			} catch (e) {
				// Error will be catch here if element for 'Home' link is not located, then adding error message to messages
				messages.push("Problem locating Home link from Left Navigation on Group Channel Page");
			}
	
		} catch (e) {
			console.log(e);
			// Error will be catch here if element for 'Live Discussion' group channel is not located, then adding error message to messages
			messages.push("Problem locating Live Discussion link from Left Navigation on "+app_name+" Web home Page");
		}
		errormsg="";
		messages.forEach(function (item) {
			errormsg = errormsg + " " + item + "\n";
		});
		// Assertion for errormsg equals ''
		expect(errormsg).to.equal('')
		});
	
		it('TC-997 and TC-1013 *** Locate Learn More and subscribe to the email and Assertion for Thanks Text Close the popup(Thanks Screen)', async () => {
			var messages = []; // Declared messages array to hold the errors
			try { // Try for Learn more
				await page.waitForSelector("shadow/main", {
					visible: true,
				  });
				await page.evaluate(_ => {
					// To scroll the page upto Learn More
					tstt=document.querySelector("app-feed").shadowRoot.querySelector("ion-content").shadowRoot.querySelector("main");
					 tstt.scrollTop=3500; // For scrolling at specific place
					});
									
					await page.waitForSelector("shadow/together-download-card", {
						visible: true,
					  });
								
				// Located Learn More link from Feed Card - Download prompt
				const downloadCard=await page.$("shadow/together-download-card");
				const learMoreLink = await downloadCard.$("shadow/div.link-container > together-highlight-text > div");
				
				await learMoreLink.click(); // Clicked on Learn more link
				try {
					//document.querySelector("#ion-overlay-4 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > app-learn-more")
					await page.waitForSelector("app-learn-more", {
						visible: true,
					  });
					// Located Learn More popup
					const learmorePopup=await page.$("app-learn-more");
					try{
						// Located heading of Learn More overlay
						const learmoreHeading=await page.$("shadow/div.email-form-heading");
						//  Located TitleTxt of Learn More overlay
						const learnmoreTitleTxt = await page.evaluate(learmoreHeading => learmoreHeading.innerText, learmoreHeading);
						console.log("Email popup title -->" + learnmoreTitleTxt);
						
						// To checking that Title text Learn More is exactly as per requirement, If not add error message to messages array
						if (String(learnmoreTitleTxt).indexOf("Want to see more?") == -1) {
							messages.push("Title inside learn more popup is not proper on "+app_name+" Web Home Page");
						}
					}catch(e){
						// If Title text inside Learn More is not located, Error will be catch here & So we are adding error message to messages array
						messages.push("Title missing inside learn more popup on "+app_name+" Web Home Page");
					}
	
					try{
						await page.waitForSelector("shadow/div.together-input > input[type=text]", {
							visible: true,
						  });
						// Located Email field inside Learn More overlay
						const learmoreInput=await page.$("shadow/div.together-input > input[type=text]");
						// For type Email-Address in Email field inside Learn More overlay
						await learmoreInput.type("dipti.gorecha@prodigyinfosoft.com");
					}catch(e){
						// If Email field inside Learn More overlay is not located, Error will be catch here & so we are adding error message to messages
						messages.push("Email Text box is missing inside learn more popup on "+app_name+" Web Home Page");
					}
	
					try{
						// Located Subsccribe button inside Learn More overlay
						await page.waitForSelector("shadow/together-email", {
							visible: true,
						  });
						const emailPopup=await page.$("shadow/together-email");
						const subscribeBtn=await emailPopup.$("shadow/together-button");
						await subscribeBtn.click(); // Clicked on Subscribe button
					}catch(e){
						// If Subscribe button inside Learn More overlay is not located, Error will be catch here & so we are adding error message to messages
						messages.push("Subscribe button is missing inside learn more popup on "+app_name+" Web Home Page");
					}
	
					try{
						await page.waitForSelector("shadow/div.signup-thanks-heading", {
							visible: true,
						  });
						// Located Thanks screen 
						const ThanksText=await page.$("shadow/div.signup-thanks-heading");
						// Located Thanks text in thanks screen 
						const ThanksTxt = await page.evaluate(ThanksText => ThanksText.innerText, ThanksText);
						console.log("Thanks Text -->" + ThanksTxt);
						
						// Checking the text of the thanks screen, If it's not as per requirement then Error will be catch here & so we are adding error message to messages
						if (String(ThanksTxt).indexOf("Thanks for signing up") == -1) {
							messages.push("Proper Thanks message is not displaying after submittig email from learn more popup is not proper on "+app_name+" Web Home Page");
						}
					}catch(e){
						// Catch for Thanks message, If thanks message is not located Add error message to messages
						messages.push("Thanks message is not displaying after submitting email from learn more popup on "+app_name+" Web Home Page");
					}
	
					try{
						await page.waitForSelector("shadow/div > div > together-close-icon", {
							visible: true,
						  });
						// Located Close Button
						const closeBtn=await page.$("shadow/div > div > together-close-icon");
						await closeBtn.click(); // Clicked on close button
						//await page.waitForTimeout(2000); // Waited for 2 seconds
					}catch(e){
						// If Close button is not located, then Error will be catch here & so we are adding error message to messages
						messages.push("Close button is missing inside learn more popup on "+app_name+" Web Home Page");
					}
	
				} catch (e) { 
					// If Learn more popup is not opened, then Error will be catch here & so we are adding error message to messages
					messages.push("Learn More Popup is not displaying on clicking learn More link from Download Card on "+app_name+" Web Home Page" + console.log(e));
				}
	
			} catch (e) {
				// If Learn More link is not located, then Error will be catch here & so we are adding error message to messages
				messages.push("Learn More link inside Download Card is missing on "+app_name+" Web Home Page");
			}
			try {
				await page.waitForSelector("shadow/ion-router-link:nth-child(1) > together-nav-item", {
					visible: true,
				  });
				// Located Home link
				const homePageHandle=await page.$("shadow/ion-router-link:nth-child(1) > together-nav-item");
				await homePageHandle.click(); // Clicked on Home link
			} catch (e) {
				// Error will be catch here if element for 'Home' link is not located, then adding error message to messages
				messages.push("Problem locating Home link from Left Navigation on Group Channel Page");
			}
			errormsg = "";
			messages.forEach(function (item) { // Loop through Messages array
				errormsg = errormsg + " " + item + "\n";
			});
			console.log(errormsg);
			// Assertion for errormsg equals ''
			expect(errormsg).to.equal('')
			
		});
	
		it('TC-1035 *** Check Be Part of the Conversation popup on home page', async () => {

			var messages = []; // Declared messages array to hold the errors
			//await page.waitFor(5000); // Waited for 5 seconds
	
			try {
				await page.waitForSelector("shadow/.reply-link", {
					visible: true,
				  });
				const reply = await page.$("shadow/.reply-link"); 
				reply.click();
				
				// Checking the header of the popup
				try {
					await page.waitForSelector("shadow/div.download-form-heading", {
						visible: true,
					  });
					// Located header of the popup
					const popupHeader = await page.$("shadow/div.download-form-contents > div.download-form-heading"); 
					
					// Found header-text
					const headerTxt = await page.evaluate(popupHeader => popupHeader.innerText, popupHeader);
					console.log(headerTxt); // For display header-text in console
					// Checking if header-text is not as per requirement, Add error message to messages 
					if (String(headerTxt).indexOf("Be Part of the Conversation") == -1) {
						messages.push("Get it on Google Play button is not redirecting to correct URL");
					}
	
				} catch (e) { 
					// Error will be catch here if element for header-text is not located, then adding error message to messages
					messages.push("Header text is missing on MSB Web Home Page" + console.log(e));
				}
	
	
				// Closing the popup
				try {
					await page.waitForSelector("shadow/together-close-icon", {
						visible: true,
					  });
					// To locate close button for the Popup
					const closeBtn = await page.$("shadow/together-close-icon"); 
					
					// For click on close button
					await closeBtn.click();
					
				} catch (e) {
					// Error will be catch here if element for close button is not located, then adding error message to messages
					messages.push("Close button is missing for Be part of the Conversation popup" + console.log(e));
				}
	
			} catch (e) {
				// Error will be catch here if element for reply link is not located, then adding error message to messages
				messages.push("Reply link is missing on 1st chat bubble on "+app_name+ " Web Home Page" + console.log(e));
			}
	
			// Concating error messages from messages array to errormsg string
			errormsg = "";
			messages.forEach(function (item) { // Loop through messages Array
				errormsg = errormsg + " " + item + "\n"; 
			});
	
			// Assertion for errormsg equals ''
			expect(errormsg).to.equal('')
		
		});
		
	
		it('TC-1013 *** Locate Discover Carousal', async () => {
			var messages = []; // Declared messages array to hold the errors
			try { // Try for Learn more
				await page.waitForSelector("shadow/main", {
					visible: true,
				  });
				await page.evaluate(_ => {
					// To scroll the page upto Learn More
					tstt=document.querySelector("app-feed").shadowRoot.querySelector("ion-content").shadowRoot.querySelector("main");
					 tstt.scrollTop=6500; // For scrolling at specific place
					});
					await page.waitForSelector("shadow/together-discover-carousel", {
						visible: true,
					  });
					const discCarousal = await page.$("shadow/together-discover-carousel");
					
					try{
						await page.waitForSelector("shadow/.discover-carousel-header .title-container", {
							visible: true,
						  });
						const discTitle = await page.$("shadow/.discover-carousel-header .title-container");
						const discTxt = await page.evaluate(discTitle => discTitle.innerText, discTitle);
						console.log(discTxt);
						if(String(discTxt)==""){
							messages.push("Discover carousal title should not empty on Feed Page");
						}
					}catch(e){
						messages.push("Discover carousal title missing on Feed Page");
					}
	
					try{
						await page.waitForSelector("shadow/.discover-description", {
							visible: true,
						  });
						const discreption = await page.$("shadow/.discover-description");
						const disciptTxt = await page.evaluate(discreption => discreption.innerText, discreption);
						console.log(disciptTxt);
						if(String(disciptTxt)==""){
							messages.push("Discover carousal description should not empty on Feed Page");
						}
					}catch(e){
						messages.push("Discover carousal description missing on Feed Page");
					}				
	
	
					try{
						await page.waitForSelector("shadow/.carousel-controls .arrow-button", {
							visible: true,
						  });
						const arrows = await page.$$("shadow/.carousel-controls .arrow-button");
						
						console.log(arrows.length);
						if(arrows.length<=0){
							messages.push("Two control arrows are not displaying inside Discover carousal on Feed Page");
						}
						const clsNameBefore = await page.evaluate(el => el.getAttribute("class"), arrows[0]);
						console.log(clsNameBefore);
						if(String(clsNameBefore)!="arrow-button beginning"){
							messages.push("Previous control arrows of Discover carousal is enabled on page load");
						}
						await arrows[1].click();
						await page.waitForTimeout(5000);
						//arrows = await page.$$("shadow/.carousel-controls .arrow-button");
						const clsNameAfter = await page.evaluate(el => el.getAttribute("class"), arrows[0]);
						console.log(clsNameAfter);
						if(String(clsNameAfter)!="arrow-button"){
							messages.push("Previous control arrows of Discover carousal is disabled even after clicking next arrow");
						}
					}catch(e){
					  console.log(e);
					}
					try{
						await page.waitForSelector("shadow/ion-slides ion-slide", {
							visible: true,
						  });
						const slides = await page.$$("shadow/ion-slides ion-slide");
						
						console.log(slides.length);
						if(slides.length<=0){
							messages.push("No Slide is displaying inside Discover carousal on Feed Page");
						}
					}catch(e){
						messages.push("No Slide is displaying inside Discover carousal on Feed Page");
					}	
	
	
	
				} catch (e) {
					// Error will be catch here if element for 'Home' link is not located, then adding error message to messages
					messages.push("Discover carousal is missing on Feed Page");
				}
			
			
				errormsg="";
				messages.forEach(function (item) {
					errormsg = errormsg + " " + item + "\n";
				});
				expect(errormsg).to.equal('')
			
				});
	
		

	xit('TC-1014 and TC-1015 *** Locate and verify "download on the app store" button and "Get it in Google Play" button on the join the community card', async () => {

		var messages = []; // Declared messages array to hold the errors
		
		try { // Try for welcomecard

			await page.waitForSelector("shadow/together-welcome", {
				visible: true,
			  });
			// Located Welcome card section 
			const welcomecard = await page.$("shadow/together-welcome > div"); 
			 
			// Checking welcome card header
			try {
				// Located Welcome card heading
				const welcomeHeader = await page.$("shadow/div.together-welcome-header"); 
				
				// Found the text of welcome card header
				const txt = await page.evaluate(welcomeHeader => welcomeHeader.innerText, welcomeHeader);
				// To display the text inside console
				console.log("Welcome card Header's heading is -->" + txt);
				
				// To checking that Heading text of welcome card is exactly as per requirement, If not add error message to messages array
				if (String(txt).indexOf(welcome_text) == -1) {
					messages.push("Header inside Welcome Card is not proper on "+app_name+" Web Home Page");
				}

			} catch (e) {
				// If header inside welcome card is not located, Error will be catch here & So we are adding error message to messages 
				messages.push("Header inside Welcome Card is missing on "+app_name+" Web Home Page ");
			}

			// Click download on appstore button and check that correct page is opening
			try {
				await page.waitForSelector("shadow/div.store-box", {
					visible: true,
				  });
				// Located App Store Button from Welcome Banner 
				const AppStoreBtn = await page.$("shadow/div.store-box > a:nth-child(1)"); 
				
				// To deal with new tab opened by clicking link that opening the webpage in new tab 
				const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise

				await AppStoreBtn.click(); // Clicked on the button
				   
				const page2 = await newPagePromise; // Define New Browser tab
				let pages = await browser.pages(); // To find out opened tabs of browser

			    // Checking the URL of the webpage opened in new tab is for App Store, If it's not then add the error message in messages
				if (String(pages[2].url()).indexOf(appstore_url) == -1) {
					messages.push("Download on the App Store button is not redirecting to correct URL");
				}
				await pages[2].close(); // Closed newly opened tab 

			} catch (e) {
				// If App store button inside welcome Banner is not located, Error will be catch here & So we are adding error message to messages 
				messages.push("Download on the App Store button inside Welcome Card is missing on "+app_name+" Web Home Page"+e);
			}
			// Click get it on Google Play button and check that correct page is opening 
			try {
				// Located Google Play button inside Welcome Banner 
				const googlePlayBtn = await page.$("shadow/div.store-box > a:nth-child(2)"); 
				
				// To deal with new tab opened by clicking link that opening the webpage in new tab 
				const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise
				await googlePlayBtn.click(); // For click on Google Play button
							
				const page2 = await newPagePromise; // For define new tab
				let pages = await browser.pages(); // To find number of opened tabs

				// Checking the URL of the webpage opened in new tab is for Play Store, If it's not then add the error message in messages
				if (String(pages[2].url()).indexOf(playstore_url) == -1) {
					messages.push("Get it on Google Play button is not redirecting to correct URL");
				}
				await pages[2].close(); // Closed newly opened tab

			} catch (e) {
				// If Google Play inside welcome card is not located, Error will be catch here & So we are adding error message to messages 
				messages.push("Get it on Google Play button inside Welcome Card is missing on "+app_name+" Web Home Page");
			}

		} catch (e) { // Catch for welcomecard, If welcome card section is not located Add error message to messages
			messages.push("Welcome Card is missing on MSB Web Home Page");
		}

		// Concating error messages from messages array to errormsg string
		errormsg = "";
		messages.forEach(function (item) { // Loop through Messages Array
			errormsg = errormsg + " " + item + "\n"; 
		});

		// Assertion for errormsg equals ''
		expect(errormsg).to.equal('')
		//await page.waitForTimeout(3000);
	});

	it('TC-1045 and TC-1047 *** Locate and verify "download on the app store" button and "Get it on the "Google Play" button on the Feed Card - Download prompt', async () => {
		var messages = []; // Array to hold error messages
		try {
			await page.waitForSelector("shadow/main");
			await page.evaluate(_ => {
				// To scroll the page upto Feed Card - Download prompt
				tstt=document.querySelector("app-feed").shadowRoot.querySelector("ion-content").shadowRoot.querySelector("main");
				tstt.scrollTop=3500; // For scrolling at specific place
				});
			// Locate Feed Card - Download prompt
			await page.waitForSelector("shadow/together-download-card", {
				visible: true,
			  });
			const downloadCard = await page.$("shadow/together-download-card");
			try {
				await page.waitForSelector("shadow/div.link-container > div > a:nth-child(1)", {
					visible: true,
				  });
				// Located App store button from Feed Card - Download prompt
				const AppStoreBtn = await page.$("shadow/div.link-container > div > a:nth-child(1)");
			
				// To deal with new tab opened by clicking link that oepening the webpage in new tab
				const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise
				
				await AppStoreBtn.click(); // Clicked on the button
				

				const page2 = await newPagePromise; // Define New browser tab
				let pages = await browser.pages(); // To find out opened tabs from browser

				// Checking the URL of the webpage opened in new tab is for App Store, If it's not then add the error message in messages
				if (String(pages[2].url()).indexOf(appstore_url) == -1) {
					messages.push("Download on the App Store button is not redirecting to correct URL");
				}

				await pages[2].close(); // Closed newly Opened tab

			} catch (e) {
				// If App Store button inside "Feed Card - Download prompt" is not located, Error will be catch here & So we are adding error message to messages 
				messages.push("Download on the App Store button inside Feed Card - Download prompt is missing on "+app_name+" Web Home Page" + console.log(e));
			}
			// Click get it on Google Play button and check that correct page is opening 
			try {
				await page.waitForSelector("shadow/div.link-container > div > a:nth-child(2)", {
					visible: true,
				  });
				// Located Google Play button inside Feed Card - Download prompt 
				const googlePlayBtn = await page.$("shadow/div.link-container > div > a:nth-child(2)");
				
				// To deal with new tab opened by clicking link that opening then webpage in new tab
				const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise
				await googlePlayBtn.click(); // For click on Google Play Button
			
				const page2 = await newPagePromise; // For define new tab
				let pages = await browser.pages(); // To find number of opened tabs

				// Checking the URL of the webpage opened in new tab is for Play Store, If it's not then add the error message in messages
				if (String(pages[2].url()).indexOf(playstore_url) == -1) {
					messages.push("Get it on Google Play button is not redirecting to correct URL");
				}
				await pages[2].close(); // Closed newly opened tab

			} catch (e) {
				// If Google Play inside Feed Card - Download prompt is not located, Error will be catch here & So we are adding error message to messages 
				messages.push("Get it on Google Play button inside download Card is missing on "+app_name+" Web Home Page" + console.log(e));
			}

		} catch (e) { // Catch for Feed Card - Download prompt, If Feed Card - Download prompt section is not located Add error message to messages
			messages.push("Download the app card is missing on "+app_name+" Web Home Page" + console.log(e));
		}

		// Concating error messages from messages array to errormsg string
		errormsg = "";
		messages.forEach(function (item) { // Loop through Messages Array
			errormsg = errormsg + " " + item + "\n";
		});
		console.log(errormsg);

		// Assertion for errormsg equals ''
		expect(errormsg).to.equal('')
		//await page.waitForTimeout(3000);


	});


	it('TC-1046 & TC-1048 *** Locate and verify "Get it on the "Google Play" button and "Download on the app store" button on "User Quotes" area', async () => {
		var messages = []; // Declared messages array to hold the errors
		try { // Try for user Quote section
			await page.waitForSelector("shadow/together-rating-carousel", {
				visible: true,
			  });
			// Located User Quote section
			const userQuote = await page.$("shadow/together-rating-carousel");
			
			// Checking User Quote section
			try { 
				// Located for User Quote title
				const userQuoteCardTitle = await userQuote.$("shadow/div.title-container");
			
				// Found the text of User Quote section
				const quoteTitleTxt = await page.evaluate(userQuoteCardTitle => userQuoteCardTitle.innerText, userQuoteCardTitle);
				// To display the text inside console
				console.log("User quote title -->" + quoteTitleTxt);

				// To checking that Heading text of User Quote is exactly as per requirement, If not add error message to messages array
				if (String(quoteTitleTxt).indexOf("USER QUOTE") == -1) {
					messages.push("Title inside User Quote Card is not proper on "+app_name+" Web Home Page");
				}

			} catch (e) {
				// If header inside User Quote section is not located, Error will be catch here & So we are adding error message to messages
				messages.push("Title missing inside User Quote Card on "+app_name+" Web Home Page" + console.log(e));
			}

			// Click download on App Store button and check that correct page is opening
			try {
				await page.waitForSelector("shadow/div.store-box", {
					visible: true,
				  });
				// Located App Store button from User Quote section
				const AppStoreBtn = await userQuote.$("shadow/div.store-box > a:nth-child(1)");
			
				// To deal with new tab opened by clicking link that opening the webpage in new tab
				const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise
				
				await AppStoreBtn.click(); // Clicked on the button
			
				const page2 = await newPagePromise; // Define  New browser tab
				let pages = await browser.pages(); // To find out opened tabs of browser

				// Checking the URL of the webpage opened in new tab is for App Store, It it's not then add the error message in messages
				if (String(pages[2].url()).indexOf(appstore_url) == -1) {
					messages.push("Download on the App Store button is not redirecting to correct URL");
				}
				await pages[2].close(); // Closed newly opened tab

			} catch (e) {
				// If App Store button inside User Quote section is not located, Error will be catch here & so we are adding error message to messages
				messages.push("Download on the App Store button inside User Quote Card is missing on "+app_name+" Web Home Page" + console.log(e));
			}
			// Click get it on Google Play button and check that correct page is opening 
			try {
				// Located Google Play button inside User Quote section
				const googlePlayBtn = await userQuote.$("shadow/div.store-box > a:nth-child(2)");
				// To deal with new tab opened by clicking link that opening the webpage in new tab
				const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise
				await googlePlayBtn.click(); // For click on Google Play Button
			
				const page2 = await newPagePromise; // For define new tab
				let pages = await browser.pages(); // To find number of opened tabs

				// Checking the URL of the webpage opened in new tab is for Play Store, If it's not then add the error message in messages
				if (String(pages[2].url()).indexOf(playstore_url) == -1) {
					messages.push("Get it on Google Play button is not redirecting to correct URL");
				}
				await pages[2].close(); // Closed newly opened tab

			} catch (e) {
				// If Google Play inside User Quote section is not located, Error will be catch here & So we are adding error message to messages
				messages.push("Get it on Google Play button inside User Quote Card is missing on "+app_name+" Web Home Page" + console.log(e));
			}

		} catch (e) { // Catch for User Quote section, If User Quote section is not located Add error message to messages
			messages.push("User Quote card is missing on "+app_name+" Web Home Page" + console.log(e));
		}

		// Concating error messages from messages array to errormsg string
		errormsg = "";
		messages.forEach(function (item) { // Loop through Messages Array
			errormsg = errormsg + " " + item + "\n";
		});


		console.log(errormsg);
		// Assertion for errormsg equals ''
		expect(errormsg).to.equal('')
		
	});


	it('TC-1112 *** Check other links', async () => {
				var messages = []; // Declared messages array to hold the errors
				try { // Try for privecy popup
		
					// Waited for app-prvary tag to load
					await page.waitForSelector("#app-wrapper > div > div.nav > together-app-nav", {
						visible: true,
					  });
					const privacyPopup = await page.$("#app-wrapper > div > div.nav > together-app-nav");  //locate app privacy pop-up
					try { 
						//document.querySelector("#app-wrapper > div > div.nav > together-app-nav").shadowRoot.querySelector("div > app-links-tc").shadowRoot.querySelector("div > div.links-list > a:nth-child(1) > together-highlight-text > div")
						
						//waited for accept button to load
						await page.waitForSelector("shadow/.links-list > a", {
							visible: true,
						  });
		
						//located ACCEPT button
						const acceptBtn = await page.$("shadow/.links-list > a");
						await acceptBtn.click();  // Clicked ACCEPT button
						
						const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise
						const page2 = await newPagePromise; // For define new tab
						let pages = await browser.pages(); // To find number of opened tabs
		
		
						// Checking the URL of the webpage opened in new tab is for Play Store, If it's not then add the error message in messages
						if (String(pages[2].url()).indexOf("https://www.healthline.com/about") == -1) {
							messages.push("About Healthline link is not redirecting to correct URL");
						}
					//	const resp=await pages[2].waitForNavigation();
						
						await  pages[2].waitForSelector("h1 > span", {
							visible: true,
						  });
						const body = await pages[2].$("h1 > span");
						const bodyTxt = await pages[2].evaluate(body => body.innerText, body);
						 console.log("contents ******************* ---- "+bodyTxt);
						
						if (String(bodyTxt).indexOf("You’re on a journey to health and wellness. And we’re right there with you.") == -1) {
							messages.push("About Healthline link is not redirecting to correct URL");
						}
						
					
						await pages[2].close(); // Closed newly opened tab
		
					} catch (e) {
						console.log(e);
						// Error will be catch here if element for 'ACCEPT' button is not located, then adding error message to messages
						messages.push("Unable to locate 'About Healthlie link in left navbar");
					}
	
	//3rd link from navbar
	try { 
		
		await page.waitForSelector("shadow/.links-list a", {
			visible: true,
		  });
		//located links list
		const lnks = await page.$$("shadow/.links-list a");
		await lnks[2].click();  // Clicked 3rd link
		const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise
		const page2 = await newPagePromise; // For define new tab
		let pages = await browser.pages(); // To find number of opened tabs
		console.log(String(pages[2].url()));
		// Checking the URL of the webpage opened in new tab is for Privacy policy, If it's not then add the error message in messages
		if (String(pages[2].url()).indexOf("healthline.com/privacy-policy") == -1) {
			messages.push("Privacy Policy link is not redirecting to correct URL");
		}
	
		await  pages[2].waitForSelector("h1 strong", {
			visible: true,
		  });
		const privacyh1 = await pages[2].$("h1 strong");
	
		const bodyTxt = await pages[2].evaluate(privacyh1 => privacyh1.innerText, privacyh1);
		console.log("contents ******************* ---- "+bodyTxt);
						
		if (String(bodyTxt).indexOf("Privacy Policy") == -1) {
			messages.push("Privacy Policy link is not redirecting to correct page");
		}
	
		await pages[2].close(); // Closed newly opened tab
	
	 } catch (e) {
		console.log(e);
		// Error will be catch here if element for 'Privacy Policy' link is not located, then adding error message to messages
		messages.push("Unable to locate 'Privacy Policy link in left navbar");
	}

	//4th link from navbar
	try { 
		await page.waitForSelector("shadow/.links-list a", {
			visible: true,
		  });
		//located links list
		const lnks = await page.$$("shadow/.links-list a");
		await lnks[3].click();  // Clicked 3rd link
		const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise
		const page2 = await newPagePromise; // For define new tab
		let pages = await browser.pages(); // To find number of opened tabs
		console.log(String(pages[2].url()));
		// Checking the URL of the webpage opened in new tab is for Privacy policy, If it's not then add the error message in messages
		if (String(pages[2].url()).indexOf("https://privacyportal-cdn.onetrust.com/") == -1) {
			messages.push("Do not sell my Info link is not redirecting to correct URL");
		}
	
		try{
		await  pages[2].waitForSelector("#dsar-webform-header-logo", {
			visible: true,
		  });
		const logo = await pages[2].$("#dsar-webform-header-logo");
		} catch (e) {
			console.log(e);
			// Error will be catch here if element for 'Privacy Policy' link is not located, then adding error message to messages
			messages.push("Do not sell my Info link is not redirecting to correct page");
		}
		
	
		await pages[2].close(); // Closed newly opened tab
	
	 } catch (e) {
		console.log(e);
		// Error will be catch here if element for 'Privacy Policy' link is not located, then adding error message to messages
		messages.push("Unable to locate 'Do not sell my Info link in left navbar");
	}
	
	
	//5th link from navbar
	try { 
		
		await page.waitForSelector("shadow/.links-list a", {
			visible: true,
		  });
		//located links list
		const lnks = await page.$$("shadow/.links-list a");
		await lnks[4].click();  // Clicked 3rd link
		const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise
		const page2 = await newPagePromise; // For define new tab
		let pages = await browser.pages(); // To find number of opened tabs
		console.log(String(pages[2].url()));
		// Checking the URL of the webpage opened in new tab is for Privacy policy, If it's not then add the error message in messages
		if (String(pages[2].url()).indexOf("healthline.com/terms-of-use") == -1) {
			messages.push("Terms of Use link is not redirecting to correct URL");
		}
	
		await  pages[2].waitForSelector("h1", {
			visible: true,
		  });
		const termh1 = await pages[2].$("h1");
	
		const bodyTxt = await pages[2].evaluate(termh1 => termh1.innerText, termh1);
		console.log("contents ******************* ---- "+bodyTxt);
						
		if (String(bodyTxt).indexOf("Terms of Use") == -1) {
			messages.push("Term of Use link is not redirecting to correct page");
		}
	
		await pages[2].close(); // Closed newly opened tab
	
	 } catch (e) {
		console.log(e);
		// Error will be catch here if element for 'Privacy Policy' link is not located, then adding error message to messages
		messages.push("Unable to locate 'Term of Use link in left navbar");
	}
	
	//6th link from navbar
	
	try { 
		
		await page.waitForSelector("shadow/.links-list a", {
			visible: true,
		  });
		//located links list
		const lnks = await page.$$("shadow/.links-list a");
		await lnks[5].click();  // Clicked 3rd link
		const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise
		const page2 = await newPagePromise; // For define new tab
		let pages = await browser.pages(); // To find number of opened tabs
		console.log(String(pages[2].url()));
		// Checking the URL of the webpage opened in new tab is for Privacy policy, If it's not then add the error message in messages
		if (String(pages[2].url()).indexOf("healthline.com/about?ref=footer#contact-us") == -1) {
			messages.push("Contact Us link is not redirecting to correct URL");
		}
		 
		await  pages[2].waitForSelector("#contact-us h2", {
			visible: true,
		  });
		const contacth1 = await pages[2].$("#contact-us h2");
	
		const bodyTxt = await pages[2].evaluate(contacth1 => contacth1.innerText, contacth1);
		console.log("contents ******************* ---- "+bodyTxt);
						
		if (String(bodyTxt).indexOf("CONTACT US") == -1) {
			messages.push("Contact Us link is not redirecting to correct page");
		}
	
		await pages[2].close(); // Closed newly opened tab
	
	 } catch (e) {
		console.log(e);
		// Error will be catch here if element for 'Privacy Policy' link is not located, then adding error message to messages
		messages.push("Unable to locate 'Contact Us link in left navbar");
	}
	
	//2nd link from navbar
	
	try { 
		
		await page.waitForSelector("shadow/.links-list a", {
			visible: true,
		  });
		//located links list
		const lnks = await page.$$("shadow/.links-list a");
		await lnks[1].click();  // Clicked 3rd link
	//	const waitforNav = page.waitForNavigation({ waitUntil: 'networkidle0' ,timeout: 15000});
		//await waitforNav;
		
		
		await  page.waitForSelector("#__next button", {
			visible: true,
		  });
		const backBtn = await page.$$("#__next button");
	
		console.log(String(page.url()));
		// Checking the URL of the webpage opened in new tab is for Privacy policy, If it's not then add the error message in messages
		if (String(page.url()).indexOf("healthline.com/privacy-settings") == -1) {
			messages.push("Privacy settings link is not redirecting to correct URL");
		}
	
		//await page.waitForTimeout(17000);
		await backBtn[1].click();  // Clicked back button
		//await page.waitForChanges();
		const newPagePromise1 = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise
						const page3 = await newPagePromise1; // For define new tab
						let pages = await browser.pages(); // To find number of opened tabs
		
						
		if (String(pages[1].url()).indexOf(URL) == -1) {
			await page.goto(URL,{
				waitUntil: 'networkidle2',
				// Remove the timeout
				timeout: 0
			});
		}
	
		
	
	 } catch (e) {
		console.log(e);
		// Error will be catch here if element for 'Privacy Policy' link is not located, then adding error message to messages
		messages.push("Unable to locate 'Privacy settings link in left navbar");
	}
				} catch (e) {
					// Error will be catch here if element for 'Privacy Policy Popup' is not located, then adding error message to messages
					messages.push("Left Navbar is missing");
				}
		
				errormsg="";
				messages.forEach(function (item) {
					errormsg = errormsg + " " + item + "\n";
				});
			
				// Assertion for error message
				expect(errormsg).to.equal('')
				});
});