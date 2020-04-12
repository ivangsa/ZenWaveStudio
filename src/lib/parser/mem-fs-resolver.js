/* eslint-disable */
'use strict';
const fs = require('fs');
const { ono } = require('ono');
const url = require('json-schema-ref-parser/lib/util/url');

module.exports = function(getContents) {
  return {
    /**
     * The order that this resolver will run, in relation to other resolvers.
     *
     * @type {number}
     */
    order: 10,

    /**
     * Determines whether this resolver can read a given file reference.
     * Resolvers that return true will be tried, in order, until one successfully resolves the file.
     * Resolvers that return false will not be given a chance to resolve the file.
     *
     * @param {object} file           - An object containing information about the referenced file
     * @param {string} file.url       - The full URL of the referenced file
     * @param {string} file.extension - The lowercased file extension (e.g. ".txt", ".html", etc.)
     * @returns {boolean}
     */
    canRead(file) {
      return url.isFileSystemPath(file.url);
    },

    /**
     * Reads the given file and returns its raw contents as a Buffer.
     *
     * @param {object} file           - An object containing information about the referenced file
     * @param {string} file.url       - The full URL of the referenced file
     * @param {string} file.extension - The lowercased file extension (e.g. ".txt", ".html", etc.)
     * @returns {Promise<Buffer>}
     */
    read(file) {
      return new Promise((resolve, reject) => {
        let path;
        try {
          path = url.toFileSystemPath(file.url);
        } catch (err) {
          reject(ono.uri(err, `Malformed URI: ${file.url}`));
        }

        // console.log('Opening file: %s', path, memFs);

        try {
          resolve(getContents(path));
        } catch (err) {
          reject(ono(err, `Error opening file "${path}"`));
        }
      });
    }
  };
};
