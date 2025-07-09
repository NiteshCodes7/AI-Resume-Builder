import React, { useState } from "react";
import Editor, {
  BtnBold,
  BtnItalic,
  createButton,
  EditorProvider,
  Toolbar,
  BtnBulletList,
  BtnNumberedList,
} from "react-simple-wysiwyg";

const RichTextEditor = ({ value, onChange }) => {
  return (
    <div>
      <EditorProvider>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnBulletList />
          <BtnNumberedList />
        </Toolbar>
        <Editor value={value || ""} onChange={onChange}></Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
