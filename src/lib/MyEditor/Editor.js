import React, { Component } from 'react'
import { convertFromRaw, EditorState } from 'draft-js'

import Editor, { composeDecorators } from 'draft-js-plugins-editor'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createToolbarPlugin from 'draft-js-static-toolbar-plugin'
import createCounterPlugin from 'draft-js-counter-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'

import { createImagePlugin } from './plugins'

import initialState from './initialState'

const linkifyPlugin = createLinkifyPlugin()
const staticToolbarPlugin = createToolbarPlugin()
const counterPlugin = createCounterPlugin()
const focusPlugin = createFocusPlugin()

const { Toolbar } = staticToolbarPlugin
const { CharCounter } = counterPlugin

const decorator = composeDecorators(focusPlugin.decorator)

const imagePlugin = createImagePlugin({ decorator })

const plugins = [
  staticToolbarPlugin,
  linkifyPlugin,
  counterPlugin,
  imagePlugin,
  focusPlugin,
]

class MyEditor extends Component {
  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState)),
  }

  onChange = (editorState) => {
    const { onChange } = this.props

    this.setState({
      editorState,
    })

    onChange(editorState)
  }

  addImage = () => {
    const newState = imagePlugin.addImage(
      this.state.editorState,
      'https://i.picsum.photos/id/777/800/400.jpg',
    )

    this.setState({
      editorState: newState,
    })
  }

  render() {
    return (
      <div>
        <Toolbar />
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => {
            this.editor = element
          }}
        />
        <div>
          <CharCounter editorState={this.state.editorState} limit={200} /> / 200
        </div>
        <div
          css={{ border: '1px solid #222', cursor: 'pointer' }}
          onClick={this.addImage}
        >
          Add
        </div>
      </div>
    )
  }
}

export default MyEditor
