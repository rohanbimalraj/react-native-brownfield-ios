// When RN_TARGET=native, the CLI points sourceDir to the parent directory
// (the brownfield native iOS app at root). This ensures autolinked pod paths
// resolve correctly relative to the Podfile's location.
// By default (standalone mode), it uses BrownfieldRN/ios/.
const isNative = process.env.RN_TARGET === 'native';

module.exports = {
  project: {
    ios: {
      sourceDir: isNative ? '..' : 'ios',
    },
  },
};
