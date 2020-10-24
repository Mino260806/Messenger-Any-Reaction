  /**************************************/
 /**   THIS SCRIPT WAS MADE BY MINO   **/
/**************************************/

var reactionUTF = '👌';
var divPlusCache = null;
var reactionsDivCache = {};
var currentTabKey = '';	
var firstTabKey = null;

(()=>{
  const reactLocation = 
    (location.host === 'www.messenger.com') ? 0 : 
    (location.host === 'www.facebook.com' && location.pathname.startsWith('/messages/t/')) ? 1 :
    (location.host === 'www.facebook.com') ? 2 : -1

  let defaultXMLHttpRequestOpen = XMLHttpRequest.prototype.open

  let isHeartCurrentReaction = false 

  const replaceHeartFunction = function(method, url, async=true, user=null, password=null) {    
  
    XMLHttpRequest.prototype.open = defaultXMLHttpRequestOpen

  
    if (method === 'POST' && url.startsWith('/webgraphql/mutation/') && url.indexOf('reaction') !== -1) {
  
  
      url = url.replace(encodeURI('👎'), encodeURI(reactionUTF))
      
  	  const evt = new CustomEvent('heart-eyes-react', { detail: {reactLocation} })
      document.dispatchEvent(evt)

      url = url.replace('REMOVE_REACTION', 'ADD_REACTION')
      
    }

    defaultXMLHttpRequestOpen.call(this, method, url, async, user, password)
  }

  function addPlusReaction(thumbsDownReactElement) {
    const reactsContainer = thumbsDownReactElement.parentElement

    isHeartCurrentReaction = Array.from(reactsContainer.children).filter(el => el.getAttribute('aria-selected') === 'true').length === 0
    if (reactsContainer.children.length === 7) {
      const plusReactElement = thumbsDownReactElement.cloneNode([true])

      plusReactElement.setAttribute('id', '+')
      plusReactElement.setAttribute('aria-label', '+')
      plusReactElement.setAttribute('aria-selected', false)

      plusReactElement.setAttribute('class', thumbsDownReactElement.className.split(' ')[0])      

      const plusReactImg = plusReactElement.getElementsByTagName('img')[0]
      plusReactImg.setAttribute('alt', '+')
      plusReactImg.setAttribute('src', 'https://www.flaticon.com/svg/static/icons/svg/32/32360.svg')      

      plusReactElement.addEventListener('click', ()=> {
      	  var divPlus = null
      	  if (divPlusCache == null) {
	      	  divPlus = document.createElement('div')
			  divPlus.style.backgroundColor = "#fcfcfc"
			  divPlus.style.position = "absolute"
			  divPlus.style.width = "260px"
			  divPlus.style.height = "364px"
			  divPlus.style.borderRadius = "6px"
			  divPlus.style.marginLeft = "auto"
			  divPlus.style.marginRight = "auto"
			  divPlus.style.left = "0"
			  divPlus.style.right = "0"
			  divPlus.style.padding = "3px"
			  divPlus.style.border = "0"
			  divPlus.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, .1), 0 1px 10px rgba(0, 0, 0, .35)'
			  divPlus.style.zIndex = '100'
			  divPlus.style.bottom = '0px'

			  var reactionsDiv = document.createElement('div')
			  reactionsDiv.style.width = "260px"
			  reactionsDiv.style.height = "324px"
			  reactionsDiv.style.overflowX = "hidden"
			  reactionsDiv.style.overflowY = "auto"

			  const tabsDiv = document.createElement('div')
			  tabsDiv.style.width = "260px"
			  tabsDiv.style.height = "40px"
			  tabsDiv.style.display = 'flex'

			  var first = true
    	      for (const key in tabs) {
    	      	const tabDiv = document.createElement('div')
			    tabDiv.style.cursor = 'pointer'
			    tabDiv.style.flex = '1 1 0%'
			    tabDiv.style.justifyContent = 'center'
			    tabDiv.style.padding = '5px 0 5px 0'
			    tabDiv.style.display = 'flex'
			    tabDiv.style.alignItems = 'center'
    	      	if (first) {
    	      		first = false
    	      		tabDiv.style.background = '#e9ebee'
    	      		currentTabKey = key
    	      		firstTabKey = key
    	      	}

    	      	const tabDivImg = document.createElement('img')
    	      	tabDivImg.src = tabs[key]
    	      	tabDivImg.style.width = '16px'
    	      	tabDivImg.style.height = '16px'
    	      	tabDivImg.style.margin = '0 1px 0 1px'
    	      	tabDiv.appendChild(tabDivImg)

    	      	tabDiv.setAttribute('alt', key) 
    	      	tabDiv.addEventListener('click', () => {
    	      		if (currentTabKey == key) return
    	      		for (var i = 0; i < tabsDiv.children.length; i++) {
    	      			tabsDiv.children[i].style.backgroundColor = 'transparent'
    	      		}
    	      		tabDiv.style.background = '#e9ebee'
    	      		currentTabKey = key
    	      		reactionsDiv.innerHTML = ''
    	      		if (reactionsDivCache[currentTabKey] == null) {
	    	      		for (var i = 0; i < reactions[currentTabKey].length; i++) {
							const reaction = thumbsDownReactElement.cloneNode([true])
							reaction.setAttribute('id', reactions[currentTabKey][i][0])
							reaction.setAttribute('aria-label', reactions[currentTabKey][i][0])
							reaction.setAttribute('aria-selected', false)

							reaction.style.marginTop = '4px'
							reaction.style.marginBottom = '4px'
							 
							const reactionImg = reaction.getElementsByTagName('img')[0]
							reactionImg.setAttribute('src', reactions[currentTabKey][i][1])
							reactionImg.setAttribute('alt', reactions[currentTabKey][i][0])
							
							const utf = reactions[currentTabKey][i][0]
							  
							reaction.addEventListener('click', function() {
								reactionUTF = utf
								
								XMLHttpRequest.prototype.open = replaceHeartFunction;

								function triggerMouseEvent (node, eventType) {
									var clickEvent = document.createEvent ('MouseEvents');
									clickEvent.initEvent (eventType, true, true);
									node.dispatchEvent (clickEvent);
								}
								triggerMouseEvent(thumbsDownReactElement, "mouseover");
								triggerMouseEvent(thumbsDownReactElement, "mousedown");
								triggerMouseEvent(thumbsDownReactElement, "mouseup");
								triggerMouseEvent(thumbsDownReactElement, "click");
							})
							 

							reactionsDiv.appendChild(reaction)
						} 
    	      		} else {
    	      			reactionsDiv.innerHTML = reactionsDivCache[currentTabKey].innerHTML
    	      			for (var i = 0; i < reactionsDiv.children.length; i++) {
					
							const utf = reactions[currentTabKey][i][0]

							reactionsDiv.children[i].addEventListener('click', function() {
								reactionUTF = utf
							
								XMLHttpRequest.prototype.open = replaceHeartFunction;

								function triggerMouseEvent (node, eventType) {
									var clickEvent = document.createEvent ('MouseEvents');
									clickEvent.initEvent (eventType, true, true);
									node.dispatchEvent (clickEvent);
								}
								triggerMouseEvent(thumbsDownReactElement, "mouseover");
								triggerMouseEvent(thumbsDownReactElement, "mousedown");
								triggerMouseEvent(thumbsDownReactElement, "mouseup");
								triggerMouseEvent(thumbsDownReactElement, "click");
							})
						}
    	      		}
    	      	})

    	      	tabsDiv.appendChild(tabDiv)
    	      }
			  
			  for (var i = 0; i < reactions[currentTabKey].length; i++) {
				const reaction = thumbsDownReactElement.cloneNode([true])
				reaction.setAttribute('id', reactions[currentTabKey][i][0])
				reaction.setAttribute('aria-label', reactions[currentTabKey][i][0])
				reaction.setAttribute('aria-selected', false)

				reaction.style.marginTop = '4px'
				reaction.style.marginBottom = '4px'
				 
				const reactionImg = reaction.getElementsByTagName('img')[0]
				reactionImg.setAttribute('src', reactions[currentTabKey][i][1])
				reactionImg.setAttribute('alt', reactions[currentTabKey][i][0])
				
				const utf = reactions[currentTabKey][i][0]
				  
				reaction.addEventListener('click', function() {
					reactionUTF = utf
					
					XMLHttpRequest.prototype.open = replaceHeartFunction;

					function triggerMouseEvent (node, eventType) {
						var clickEvent = document.createEvent ('MouseEvents');
						clickEvent.initEvent (eventType, true, true);
						node.dispatchEvent (clickEvent);
					}
					triggerMouseEvent(thumbsDownReactElement, "mouseover");
					triggerMouseEvent(thumbsDownReactElement, "mousedown");
					triggerMouseEvent(thumbsDownReactElement, "mouseup");
					triggerMouseEvent(thumbsDownReactElement, "click");
				})
				 

				reactionsDiv.appendChild(reaction)
			  }
			  divPlus.appendChild(reactionsDiv)
			  divPlus.appendChild(tabsDiv)
			  reactionsDivCache[currentTabKey] = reactionsDiv.cloneNode([true])
			  divPlusCache = divPlus.cloneNode([true])
			} else {
				currentTabKey = firstTabKey
				divPlus = divPlusCache.cloneNode([true])
				divPlus.children[0] = reactionsDivCache[currentTabKey].cloneNode([true])

				for (var i = 0; i < divPlus.children[0].children.length; i++) {
					
					const utf = reactions[currentTabKey][i][0]

					divPlus.children[0].children[i].addEventListener('click', function() {
						reactionUTF = utf
					
						XMLHttpRequest.prototype.open = replaceHeartFunction;

						function triggerMouseEvent (node, eventType) {
							var clickEvent = document.createEvent ('MouseEvents');
							clickEvent.initEvent (eventType, true, true);
							node.dispatchEvent (clickEvent);
						}
						triggerMouseEvent(thumbsDownReactElement, "mouseover");
						triggerMouseEvent(thumbsDownReactElement, "mousedown");
						triggerMouseEvent(thumbsDownReactElement, "mouseup");
						triggerMouseEvent(thumbsDownReactElement, "click");
					})
				}

				for (var j = 0; j < divPlus.children[1].children.length; j++) {
					const tabDiv = divPlus.children[1].children[j]
					const tabsDiv = divPlus.children[1]
					const reactionsDiv = divPlus.children[0]
					tabDiv.addEventListener('click', () => {
	    	      		const key = tabDiv.getAttribute('alt')
	    	      		if (currentTabKey == key) return
	    	      		for (var i = 0; i < tabsDiv.children.length; i++) {
	    	      			tabsDiv.children[i].style.backgroundColor = 'transparent'
	    	      		}
	    	      		tabDiv.style.background = '#e9ebee'
	    	      		currentTabKey = key
	    	      		reactionsDiv.innerHTML = ''
	    	      		if (reactionsDivCache[currentTabKey] == null) {
		    	      		for (var i = 0; i < reactions[currentTabKey].length; i++) {
								const reaction = thumbsDownReactElement.cloneNode([true])
								reaction.setAttribute('id', reactions[currentTabKey][i][0])
								reaction.setAttribute('aria-label', reactions[currentTabKey][i][0])
								reaction.setAttribute('aria-selected', false)

								reaction.style.marginTop = '4px'
								reaction.style.marginBottom = '4px'
								 
								const reactionImg = reaction.getElementsByTagName('img')[0]
								reactionImg.setAttribute('src', reactions[currentTabKey][i][1])
								reactionImg.setAttribute('alt', reactions[currentTabKey][i][0])
								
								const utf = reactions[currentTabKey][i][0]
								  
								reaction.addEventListener('click', function() {
									reactionUTF = utf
									
									XMLHttpRequest.prototype.open = replaceHeartFunction;

									function triggerMouseEvent (node, eventType) {
										var clickEvent = document.createEvent ('MouseEvents');
										clickEvent.initEvent (eventType, true, true);
										node.dispatchEvent (clickEvent);
									}
									triggerMouseEvent(thumbsDownReactElement, "mouseover");
									triggerMouseEvent(thumbsDownReactElement, "mousedown");
									triggerMouseEvent(thumbsDownReactElement, "mouseup");
									triggerMouseEvent(thumbsDownReactElement, "click");
								})
								 

								reactionsDiv.appendChild(reaction)
							} 
	    	      		} else {
	    	      			reactionsDiv.innerHTML = reactionsDivCache[currentTabKey].innerHTML
	    	      			for (var i = 0; i < reactionsDiv.children.length; i++) {
						
								const utf = reactions[currentTabKey][i][0]

								reactionsDiv.children[i].addEventListener('click', function() {
									reactionUTF = utf
								
									XMLHttpRequest.prototype.open = replaceHeartFunction;

									function triggerMouseEvent (node, eventType) {
										var clickEvent = document.createEvent ('MouseEvents');
										clickEvent.initEvent (eventType, true, true);
										node.dispatchEvent (clickEvent);
									}
									triggerMouseEvent(thumbsDownReactElement, "mouseover");
									triggerMouseEvent(thumbsDownReactElement, "mousedown");
									triggerMouseEvent(thumbsDownReactElement, "mouseup");
									triggerMouseEvent(thumbsDownReactElement, "click");
								})
							}
	    	      		}
	    	      	})	
				}
			}
		 
	      thumbsDownReactElement.insertAdjacentElement('afterend', divPlus)
	    })

	  thumbsDownReactElement.insertAdjacentElement('afterend', plusReactElement)
    }
  }

  const observer = new MutationObserver((mutationsList, observer) => {
    for(let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const thumbsDownReactElement = document.getElementById('👎')
        if (thumbsDownReactElement !== null) {
          addPlusReaction(thumbsDownReactElement)
        }
      }
    }
  })


  if (reactLocation === 0) {

    observer.observe(document.body, { childList: true })

  } else if (reactLocation === 1) {

    observer.observe(document.getElementById('globalContainer'), { childList: true })

  } else if (reactLocation === 2) {

    const chatTabsPagelet = document.getElementById('ChatTabsPagelet')

    if (chatTabsPagelet === null) return

    chatTabsPagelet.addEventListener('DOMNodeInserted', evt => {
      if (!evt.target.classList.contains('uiContextualLayerPositioner')) return
     
      const thumbsDownReactElement = document.getElementById('👎')
      if (thumbsDownReactElement !== null) {
         addHeartReaction(thumbsDownReactElement)
      } 
	})
  }
})()