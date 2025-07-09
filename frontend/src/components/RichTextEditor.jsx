import React, { useState } from 'react';
import Editor, { 
  BtnBold, 
  BtnItalic, 
  createButton,
  EditorProvider, 
  Toolbar
} from 'react-simple-wysiwyg';


const RichTextEditor = ({value, onChange}) => {    

  return (
    <div>
        <EditorProvider>
            <Editor 
                value={value || ""} 
                onChange={onChange}
            >
            </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor;
