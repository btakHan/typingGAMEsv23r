import Main     from './views/pages/Main.js'
import Result   from './views/pages/Result.js'
import Error404 from './views/pages/Error404.js'
import Style    from './css/Style.js';
// await Navbar.after_render();
// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'             : Main
    , '/result'     : Result
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    // Lazy load view element:
    const content = null || document.getElementById('app');

    // Get the parsed URl from the addressbar
    const request = parseRequestURL();
    const parsedURL = request.resource ? '/' + request.resource : '/';
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    const page = routes[parsedURL] ? routes[parsedURL] : Error404
    if(beforePage !== parsedURL) {
        beforePage = parsedURL;
        const html = await page.render();
        
        content.innerHTML = `${html} ${Style}` ;
        
        await page.after_render();
    }
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);


function parseRequestURL() {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/")
    let request = {
        resource    : null,
    }
    request.resource    = r[1]

    return request
}
