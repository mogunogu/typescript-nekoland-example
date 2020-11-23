
type LogChennel =
| 'local'
| 'web'

type LogLevel =
| 0
| 1
| 2
| 3
| 4

interface LogConfig {
    defualt_log_channel:LogChennel
}