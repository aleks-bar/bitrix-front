import { defineConfig, loadEnv } from 'vite';
import { UserConfig } from 'vite';
import {resolve} from "path";
import {getRollupInputFromDirectory} from "./src/system/actions";

interface EnvFile {
  MODE: "development" | "production"
  PORT: string
  HOST: string
  DOMAIN: string
}

// function moveHtmlPlugin() {
//   return {
//     name: 'move-html-files',
//     generateBundle(options, bundle) {
//       // Редактируем HTML файлы в bundle
//       Object.keys(bundle).forEach((fileName) => {
//         console.log(fileName)
//         if (fileName.endsWith('.html')) {
//           const file = bundle[fileName];
//           delete bundle[fileName];
//           bundle[`renamed/${fileName}`] = file;
//         }
//       });
//     }
//   };
// }


// function customHtmlPathPlugin(newPathMap) {
//   return {
//     name: 'custom-html-path',
//     configResolved(config) {
//       const inputOptions = config.build.rollupOptions.input;
//       for (const key in inputOptions) {
//         // console.log(sep)
//         // console.log(inputOptions[key])
//         // console.log()
//         // console.log(parse(inputOptions[key]))
//         // console.log(newPathMap[key])
//         if (newPathMap[key]) {
//           inputOptions[key] = inputOptions[key].replace(`src${sep}app${sep}pages`, 'pages');
//         }
//       }
//     }
//   }
// }

export default defineConfig( ( configEnv ) => {
  const { mode } = configEnv;

  // @ts-ignore
  const env = loadEnv( mode, process.cwd(), '' ) as EnvFile

  const input = getRollupInputFromDirectory(resolve(__dirname, 'pages'))

  const isDev = mode === 'development'

  const userConfig: UserConfig  = {
    plugins: [
    ],
    server: {
      cors: true,
      strictPort: true,
      port: +env.PORT,
      open: 'pages/main/index.html',
      // https: false,
      origin: !isDev ? env.DOMAIN : undefined,
    },
    build: {
      rollupOptions: {
        input,
        output: {
          assetFileNames: ( assetInfo ) => {
            console.log(assetInfo)
            // @ts-ignore
            let extType = assetInfo.name.split( '.' )[ 1 ];

            if ( /png|jpe?g|svg|gif|tiff|bmp|ico/i.test( extType ) ) {
              extType = 'img';
            }

            if ( /css|scss/i.test( extType ) ) {
              extType = 'css';
            }

            if ( extType === 'css' ) {
              return `${ extType }/[name].[hash][extname]`;
            }

            return `assets/${ extType }/[name].[hash][extname]`;
          },
        }
      },
    }
  }

  return userConfig;
});