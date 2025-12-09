const http = require('http');

const port=3000;
const server = http.createServer((req,res)=>{
    const url=req.url;
    const methode=req.method;

    if ( url ==='/' && methode === 'GET'){
        res.statusCode=200;
        res.setHeader( 'Content-Type' , 'text/plain' );
        return res.end('Welcome to the Home Page');
    }

    else if (url === '/info' && methode === 'GET'){
        res.statusCode=200;
        res.setHeader( 'Content-Type' , 'text/plain' );
        return res.end('This is the information page');
    }

    else if (url === '/submit' && methode === 'POST'){
        let message=''
        req.on('data', chunk => {
            message += chunk;
        });

        
        req.on('end', () => {
            try {
                const data = JSON.parse(message);
                res.statusCode=200;
                res.setHeader( 'Content-Type' , 'text/plain' );
                return res.end(JSON.stringify(data));
            } catch (err) {
                res.statusCode=200;
                res.setHeader( 'Content-Type' , 'text/plain' );
                return res.end('Invalid JSON');
            }
        });

    }
    else {
        res.statusCode=404;
        return res.end('page not found ')
    }
    
});
server.listen(port , ()=>{
     console.log(`Server running on http://localhost:${port}`);
});