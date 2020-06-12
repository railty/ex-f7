var os = require('os');
var exec = require('child_process').exec;
var cp = require('child_process');

function puts(error, stdout, stderr) { sys.puts(stdout) }

let child;
if (os.type() === 'Linux') {
    try{
        //let child1 = cp.spawn('npm', ["run", "dev"], { detached: true, stdio: 'inherit' });
        //let child2 = exec("chromium http://localhost:3333", puts);     

        //child = cp.spawn('chromium', ["http://localhost:3333"], { detached: true, stdio: 'inherit' });
        //child = exec("chromium http://localhost:3333", puts);     

        let child1 = exec("npm run dev", puts);
        let child2 = exec("chromium http://localhost:3333", puts);
    }
    catch(ex){
        console.log(ex);
    }
}
else if (os.type() === 'Darwin') 
   exec("node build-mac.js", puts); 
else if (os.type() === 'Windows_NT') 
   exec("node build-windows.js", puts);
else
   throw new Error("Unsupported OS found: " + os.type());

console.log(child);
//child.unref();