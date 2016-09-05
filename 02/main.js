
(function() {
    document.addEventListener("DOMContentLoaded", function(e) {
        var c = document.getElementById('canvas');
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        
        var gl = c.getContext('webgl') || c.getContext('experimental-webgl');
        if (!gl) {
            document.write("This browser does not support webgl");
            return;
        }

        window.addEventListener("resize", function(e) {
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        });

        var vs = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vs, document.getElementById("vs").text);
        gl.compileShader(vs);
        if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
            console.log("vertex shader compile error");
            console.log(gl.getShaderInfoLog(vs));
            return;
        }
        var fs = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fs, document.getElementById("fs").text);
        gl.compileShader(fs);
        if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
            console.log("fragment shader compile error");
            console.log(gl.getShaderInfoLog(fs));
            return;
        }

        var prog = gl.createProgram();
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.log("link error");
            console.log(gl.getShaderInfoLog(fs));
            return;
        }
        gl.useProgram(prog);

        var vbuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbuf);
        gl.bufferData(gl.ARRAY_BUFFER,
                      new Float32Array([1.0, 1.0, 0, -1.0, 1.0, 0, 1.0, -1.0, 0, -1.0, -1.0, 0]),
                      gl.STATIC_DRAW);

        var frame = 0;
        var startTime = (new Date).getTime();
        function drawFrame() {
            frame++;

            gl.uniform2f(gl.getUniformLocation(prog, "resolution"),
                         window.innerWidth, window.innerHeight);
            gl.uniform1f(gl.getUniformLocation(prog, "time"), (new Date).getTime() - startTime);
            
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.enable(gl.DEPTH_TEST);

            var vpos = gl.getAttribLocation(prog, "position");

            gl.bindBuffer(gl.ARRAY_BUFFER, vbuf);
            gl.vertexAttribPointer(vpos, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(vpos);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            gl.flush();
            setTimeout(drawFrame, 16);
        }
        drawFrame();
    });
})();
