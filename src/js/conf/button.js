// core coding by Mapk Volkov
const Photoclip=require('photoclip');
const html2canvas=require('html2canvas/dist/html2canvas');
const block=$('#block');
const area=$('#clipArea');
const ok=$('#clipBtn');
const view=$('#view');
const can=$('#canvas');
const img=$('#img');
const file=$('#file');
const photo=new Photoclip(area,{
    adaptive: ['100%', '100%'],
    outputSize: 640,
    file,
    view,
    ok,
    maxZoom: "2",
    // img: 'img/mm.jpg',
    loadStart: function() {
        view.css('display','none');
        console.log('开始读取照片');
    },
    loadComplete: function() {
        console.log('照片读取完成');

    },
    done: function(dataURL) {
        view.css('display','block');
        html2canvas(block).then((canvas)=>{
            can.append(canvas);
            var a1='../../images/1.jpg';
            img.on('load',()=>{
                const a1=canvas.toDataURL('image/png');
                img.attr('src',a1);
            });
            img.attr('src',a1);           
        });
    },
    fail: function(msg) {
        alert(msg);
    }
});





