[Back to Main Page](https://github.com/SorinGFS/webaccess#configuration)

### Adjust Env Vars

Adjust the environmental variables according to the existing needs. Do this in every environment. By default there are only 3 variables, of which only COOKIE_SECRET is mandatory to be modified, the others can remain as they are. If other variables need to be added, the syntaxes are explained below.

### DotEnv Syntaxes

#### Syntaxes similar to any shell

```shell
BASIC=basic

# previous line intentionally left blank
AFTER_LINE=after_line
EMPTY=
SINGLE_QUOTES='single_quotes'
SINGLE_QUOTES_SPACED='    single quotes    '
DOUBLE_QUOTES="double_quotes"
DOUBLE_QUOTES_SPACED="    double quotes    "
EXPAND_NEWLINES="expand\nnew\nlines"
DONT_EXPAND_UNQUOTED=dontexpand\nnewlines
DONT_EXPAND_SQUOTED='dontexpand\nnewlines'
# COMMENTS=work
EQUAL_SIGNS=equals==
RETAIN_INNER_QUOTES={"foo": "bar"}
RETAIN_INNER_QUOTES_AS_STRING='{"foo": "bar"}'
TRIM_SPACE_FROM_UNQUOTED=    some spaced out string
USERNAME=therealnerdybeast@example.tld
    SPACED_KEY = parsed
```

#### Unconventional behaviour

DotEnv will retain any quote char if not paired.

```
RETAIN_LEADING_DQUOTE="retained
RETAIN_LEADING_SQUOTE='retained
RETAIN_TRAILING_DQUOTE=retained"
RETAIN_TRAILING_SQUOTE=retained'
```