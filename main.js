var refFiles  = [],      //读取的js文件
    resHost = '',        //服务器主机地址
    resPath = '';        //项目路径

/*
example:
var refFiles  = ['1.js', '2.js', '3.js', '4.js', '5.js'],      //读取的js文件
    resHost = 'static.tresensa.com',                           //服务器主机地址
    resPath = '/vector-runner-remix/assets-1.1.4/';            //项目路径
*/

var http = require('http'), 
    fs = require('fs'), 
    mkdirp = require('mkdirp'),
    sourceContents = [],            
    fileContent,                    
    imgPaths = [],
    imgPattern = /('|")(\w|\/)+\.(?:png|jpg|bmp|gif)('|")/gi,
    matches,
    imgPath;
    
//生成文件内容数组
for (var i =0; i < refFiles.length; i ++) {
    fileContent = fs.readFileSync(refFiles[i]) ;
    sourceContents.push(fileContent);
}

//生成图片路径数组
for (var i =0; i < sourceContents.length; i++) {
    imgPath = '' + sourceContents[i];
    matches = imgPath.match(imgPattern);
    imgPaths = imgPaths.concat(matches);
};

//图片路径微调，下载图片
for(var j = 0; j < imgPaths.length; j++) {
    imgPath = imgPaths[j];
    if (imgPath) {
        imgPath = imgPath.substr(1, imgPath.length - 2);
        imgPath.replace('./','');
        getResource(imgPath);
    };
}

function getResource(path) {
    var httpOptions = {
        host: resHost,
        port: 80
    };
    httpOptions.path = resPath + path;
    //获取图片的路径
    var index = path.lastIndexOf('/');
    var folderPath = path.substr(0,index);
    var fileName = path.substr(index + 1, path.length -1);

    //检查图片文件夹是否存在，不存在则创建
    mkdirp(folderPath, function(err) { 
        http.get(httpOptions, function(res){
            var imagedata = '';
            res.setEncoding('binary');

            res.on('data', function(chunk){
                imagedata += chunk
            });

            res.on('end', function(){
                fs.writeFile(path, imagedata, 'binary', function(err){
                    if (err) throw err
                    console.log('File saved：' + path);
                })
            });
        });
    });
};