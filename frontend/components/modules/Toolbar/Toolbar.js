import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useGA4React} from 'ga-4-react'
import {Grid, Toolbar as MuiToolbar} from '@material-ui/core'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import ShareIcon from '@material-ui/icons/Share'

import {setProjectData} from '../../../slices'
import IconButton from '../../elements/IconButton'
import SharePanel from './SharePanel'
import ExportPanel from './ExportPanel'
import {loadProjectDataFromFile} from '../../../features/project'

export default function Toolbar() {
  const dispatch = useDispatch()
  const ga4React = useGA4React()
  const [sharePanelOpen, setSharePanel] = useState(false)
  const [exportPanelOpen, setExportPanel] = useState(false)

  const onImportClicked = async () => {
    const projectData = await loadProjectDataFromFile()
    dispatch(setProjectData(projectData))
    ga4React.gtag('event', 'import_project')
  }

  const showSharePanel = () => {
    setSharePanel(true)
  }

  const hideSharePanel = () => {
    setSharePanel(false)
  }

  const showExportPanel = () => {
    setExportPanel(true)
  }

  const hideExportPanel = () => {
    setExportPanel(false)
  }

  return (
    <>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <MuiToolbar>
            <IconButton description={'分享'} icon={ShareIcon} onClick={showSharePanel}/>
            <IconButton description={'匯出專案'} icon={ArchiveIcon} onClick={showExportPanel}/>
            <IconButton description={'匯入專案'} icon={UnarchiveIcon} onClick={onImportClicked}/>
          </MuiToolbar>
        </Grid>
      </Grid>

      <SharePanel open={sharePanelOpen} onClose={hideSharePanel}/>
      <ExportPanel open={exportPanelOpen} onClose={hideExportPanel}/>
    </>
  )
}

