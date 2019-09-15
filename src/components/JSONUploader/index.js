// @flow
import React, { type Node, Component } from 'react'
import {
  IoIosArrowDown as ArrowDownIcon,
  IoIosArrowUp as ArrowUpIcon,
} from 'react-icons/io'
import ContextMenu from 'components/ContextMenu'
import { Row } from 'componentsStyled/Layout'
import { Wrapper } from './styled'
import { Submit } from 'componentsStyled/Buttons'

type Props = {|
  component: any,
  children: Node,
  data?: Object,
|}

/**
 * Used to handle a set of sub-links (similar to a context menu or a link with children links)
 * @param {Component} component- The component that is rendered and wrapped inside the conditional Context Menu
 * @param {React.Node} children - Most likely the name of the option to be displayed
 * @param {Object} data - Optional parameter to watch. If it changes, we close all previous open stateful links (if user logs in, for example) 
 */

var fileReader = new FileReader()

const handleFileRead = (callback: any) => {
  const content = fileReader.result

  console.log('final content: ', content)

  console.log('callback: ', callback)

  // Apply json transformations

  if (callback) {
    callback(content)
  }
}

const handleFileChosen = (file: any, callback: Function) => {
  fileReader = new FileReader()
  fileReader.onloadend = () => handleFileRead(callback)
  fileReader.readAsText(file)
}

class JSONUploader extends Component <any, any> {

  constructor(props: Props) {
    super(props)


    // $Ignore
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e: any) {
    e.preventDefault()
    const fileUpload = e.target.files[0]

    handleFileChosen(fileUpload, this.props.callback)
  }


  render() {
    return (
      <form encType="multipart/form-data">
        <input onChange={e => this.handleSubmit(e)} type="file" ref="file" accept=".json" id="fileInput" aria-describedby="fileHelp" />

      </form>
    )
  }
}

export default (JSONUploader)
