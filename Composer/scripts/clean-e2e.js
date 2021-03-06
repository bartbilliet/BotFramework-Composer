// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */

const path = require('path');

const rimraf = require('rimraf');

const rootDir = path.resolve(__dirname, '..');

const BOTS_DIR = process.env.COMPOSER_BOTS_FOLDER || path.resolve(rootDir, 'cypress/__test_bots__');
const APP_DATA = process.env.COMPOSER_APP_DATA || path.resolve(rootDir, 'cypress/__e2e_data.json');

function cleanup() {
  try {
    rimraf.sync(BOTS_DIR);
  } catch {
    // do nothing
  }

  try {
    rimraf.sync(APP_DATA);
  } catch {
    // do nothing
  }
}

cleanup();
