import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {useDispatch, useSelector} from 'react-redux'

import {changeShareLink, clearShareLink} from '../../../../redux/current'
import {getShareLink} from '../../../../redux/selectors'
import Toolbar from '../../../modules/header/Toolbar'


export default function ToolbarContainer({appController}) {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const shareLink = useSelector(getShareLink)

  const onGenerateShareLink = async ({messageIncluded}) => {
    try {
      const shareLink = await appController.generateShareLink({messageIncluded})
      await dispatch(changeShareLink(shareLink))
    } catch (e) {
      console.log(e)
      appController.throwError(t('產生分享連結失敗'))
    }
  }

  const onClearShareLink = () => {
    dispatch(clearShareLink())
  }

  const onExportProject = async ({filename, messageIncluded}) => {
    await appController.exportProject({filename, messageIncluded})
  }

  const onImportProject = async () => {
    await appController.importProject()
  }

  return (
    <Toolbar
      shareLink={shareLink}
      onGenerateShareLink={onGenerateShareLink}
      onClearShareLink={onClearShareLink}

      onExportProject={onExportProject}
      onImportProject={onImportProject}
    />
  )
}

ToolbarContainer.propTypes = {
  appController: PropTypes.object.isRequired,
}
