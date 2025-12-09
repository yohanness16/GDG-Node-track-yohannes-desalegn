const http = require('http');

const port=4000;
let students=[];
let id=1;
const server =http.createServer((req , res)=>{
    const method =req.method;
    const url =req.url;
    

    const sendJSON = (status, data) => {
        res.statusCode=status;
        res.setHeader( 'Content-Type' , 'application/json' );
        res.end(JSON.stringify(data));
    };

    if (url === '/students' && method === 'GET'){
        sendJSON(200,students)
    }

    else if (url === '/students' && method === 'POST'){

        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const { name } = JSON.parse(body);
                const newStudent = { id: id++, name };
                students.push(newStudent);
                sendJSON(201, newStudent);
            } catch (err) {
                sendJSON(400, { error: 'Invalid JSON' });
            }

    })}

    else if (url ==='/students/' && method === 'PUT') {
        const id = parseInt(url.split('/')[2]);
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const { name } = JSON.parse(body);
                const student = students.find(s => s.id === id);
                if (student) {
                    student.name = name;
                    sendJSON(200, student);
                } else {
                    sendJSON(404, { error: 'Student not found' });
                }
            } catch (err) {
                sendJSON(400, { error: 'Invalid JSON' });
            }
        });

}

    else if (url === '/students/' && method === 'DELETE' ) {
        const id = parseInt(url.split('/')[2]);
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students.splice(index, 1);
            sendJSON(200, { message: 'Student deleted' });
        } else {
            sendJSON(404, { error: 'Student not found' });
        }

    
    } else {
        sendJSON(404, { error: 'Not Found' });
    }
}
)

server.listen(port , ()=>{
    console.log(`Server running on http://localhost:${port}`);
})