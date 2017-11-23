const autoPrefixer=require('autoprefixer');
const pxToRem=require('postcss-pxtorem');
const cleanCss=require('postcss-clean');
const cssUrl=require('postcss-url');
const cssUrlRev=require('postcss-urlrev');
const app={
    src:`../src`,
    dist:`../dist`,
};
const base={
    scss:{
        src:`${app.src}/scss/**/*.scss`,
        dist:`${app.dist}/css`,
        msg:{
            notice:`CSS编译并整合完成`,
            err:`sass编译错误`
        },
    },
    postcss:[
        autoPrefixer,
        pxToRem({
            rootValue: 100,
            propList:['*','!border*'],
            selectorBlackList:['yi-pc','norem']
        }),
        cleanCss({
            compatibility:`ie8`
        }),
        cssUrl([
            {
                filter: /\.(png|jpg|gif|svg|ico|tiff|woff|eot)$/,
                url:'inline',
                basePath:`../images/`,
                encodeType:'base64',
                maxSize:5
            }
        ]),
        cssUrlRev({
            includeRemote:true
        })
    ],
    pug:{
        src:`${app.src}/pug/**/*.pug`,
        utilsrc:`!${app.src}/pug/**/_*.pug`,
        dist:`${app.dist}/html`,
        pretty:true,
        msg:{
            notice:`HTML编译并整合完成`,
            err:`pug编译错误`
        }
    },
    img:{
        src:[
            `${app.src}/images/**/*.png`,
            `${app.src}/images/**/*.jpg`,
            `${app.src}/images/**/*.gif`,
            `${app.src}/images/**/*.svg`
        ],
        dist:`${app.dist}/images`,
        msg:{
            notice:`images图片压缩完成`,
            err:`image并没有编译成功`
        }
    },
    js:{
        src:`${app.src}/js/conf/*.js`,
        dist:`${app.dist}/js/conf`,
        msg:{
            notice:`webpack整合JS完成`,
            err:`webpack编译错误`
        }
    },
    files:{
        rename:`.min`
    }
};
module.exports={
    app,
    base
}
