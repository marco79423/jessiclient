import {useMediaQuery, useTheme} from '@material-ui/core'

export default function useMobileMode() {
  const theme = useTheme()
  const matchXS = useMediaQuery(theme.breakpoints.up('xs'))
  const matchSM = useMediaQuery(theme.breakpoints.up('sm'))
  return matchXS && !matchSM
}
