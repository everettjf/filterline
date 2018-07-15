# filterline
Command line replacement for VSCode Extension: [vscode-filter-line](https://github.com/everettjf/vscode-filter-line)

# Install

```
npm install -g filterline
```

# Usage

```
filterline <filepath>
```

# Config file search order

For example, running command 

```
filterline /Users/everettjf/log/demo/log0eoml/foo.log
```

will search corresponding config file in the order as below:

```
  '/Users/everettjf/log/demo/log0eoml/filterline.eoml',
  '/Users/everettjf/log/demo/log0eoml/filterline.json',
  '/Users/everettjf/log/demo/log0eoml/.vscode/filterline.eoml',
  '/Users/everettjf/log/demo/log0eoml/.vscode/filterline.json',

  '/Users/everettjf/log/demo/filterline.eoml',
  '/Users/everettjf/log/demo/filterline.json',
  '/Users/everettjf/log/demo/.vscode/filterline.eoml',
  '/Users/everettjf/log/demo/.vscode/filterline.json',

  '/Users/everettjf/log/filterline.eoml',
  '/Users/everettjf/log/filterline.json',
  '/Users/everettjf/log/.vscode/filterline.eoml',
  '/Users/everettjf/log/.vscode/filterline.json' 
```


# Configuration Format

Visit https://github.com/everettjf/vscode-filter-line


**Enjoy!**



