import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import styled from 'styled-components';
import StrapiAdminEditor from '../../ckeditor5-build-strapi-admin';

const Wrapper = styled.div`
  .ck-editor__main {
    min-height: 200px;
    > div {
      min-height: 200px;
    }
  }
`;

const Editor = React.forwardRef(({ onChange, name, data, ...rest }, ref) => {
  return (
    <Wrapper>
      <CKEditor
        ref={ref}
        editor={StrapiAdminEditor}
        onChange={(event, editor) => {
          const newData = editor.getData();
          onChange({ target: { name, value: newData } });
        }}
        {...rest}
      />
    </Wrapper>
  );
});

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.string,
};

export default Editor;
