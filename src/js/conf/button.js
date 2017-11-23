// core coding by Mapk Volkov
const Photoclip=require('photoclip');
const html2canvas=require('html2canvas/dist/html2canvas');
const block=$('#block');
const area=$('#clipArea');
const btn=$('#clipBtn');
const view=$('#view');
const can=$('#canvas');
const img=$('#img');
const photo=new Photoclip(area,{
    // size: 260,
    adaptive: ['100%', '100%'],
    outputSize: 640,
    //adaptive: ['60%', '80%'],
    file: '#file',
    view: '#view',
    ok: '#clipBtn',
    maxZoom: "2",
    // img: 'img/mm.jpg',
    loadStart: function() {
        console.log('开始读取照片');
    },
    loadComplete: function() {
        console.log('照片读取完成');
    },
    done: function(dataURL) {
        console.log(dataURL);

    },
    fail: function(msg) {
        alert(msg);
    }
});
btn.on('click',()=>{
	view.css('display','block');
});
html2canvas(block).then((canvas)=>{
        can.append(canvas);
        var a1='../../images/1.jpg';
        img.on('load',()=>{
            const a1=canvas.toDataURL('image/png');
            img.attr('src',a1);
        });
        img.attr('src',a1);           
    });
