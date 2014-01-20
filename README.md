# Table of Contents

The source of the landing page of `jmeas.com`.

### Installation

- Clone this repository.  
  `git clone http://www.github.com/...`

- Copy `_remote.json` to `remote.json`.  
  `cp config/_remote.json config/remote.json`

- Copy `src/data/_config.yaml` to `src/data/config.yaml`  
  `cp src/data/_config.yaml config/remote.json`

Making changes to the config files above is an option, but is not necessary.

### Structure

This website uses a three-pronged structure. `src` contains all of the source files. `test` is a built website that includes source maps. `prod` is the built site without source maps.

### Building

- Build the test site by running `grunt`.  
- Open the file `test/index.html` in your favorite browser.

### Extending

To make changes, modify the `src` directory and then run `grunt`.

### Typekit

This site incorporates the Typekit font [https://typekit.com/fonts/adriane-text](Adriane Text). To see the site correctly, install this font locally or attach a kit to the site with Adriane Text in it.