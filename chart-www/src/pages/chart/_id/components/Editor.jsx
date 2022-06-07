import React, { useRef } from 'react';
import ClassNames from 'classnames';
import RenderJudge from '@/components/RenderJudge';
import Iconfont from '@/components/Iconfont';
import PageLoading from '@/components/PageLoading';
import { empty } from '@/common/utils';
import useEditor from '../utils/useEditor';

import styles from '../style/Editor.scss';

const Editor = ({ code, onRunner }) => {
  const editorRef = useRef();

  const { loading, editor } = useEditor({ ref: editorRef, code });

  const onRunnerHandle = () => onRunner(editor.getValue());

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <div className={styles.tabItem}>完整代码</div>
          <div className={ClassNames(styles.tabItem, styles.isActive)}>代码编辑</div>
          <div className={styles.tabItem}>完整代码</div>
        </div>
        <div className={styles.controls}>
          <div className={styles.ctrl}>
            <Iconfont className={styles.ctrlIcon} name="code" />
            <span className={styles.ctrlLabel}>格式化</span>
          </div>
          <div className={ClassNames(styles.ctrl, styles.isRun)} onClick={onRunnerHandle}>
            <Iconfont className={styles.ctrlIcon} name="play" />
            <span className={styles.ctrlLabel}>运行</span>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.editor} ref={editorRef} />
        <RenderJudge
          value={loading}
          active={(
            <PageLoading className={loading} height="100%" />
          )}
        />
      </div>
    </div>
  );
};

Editor.defaultProps = {
  onRunner: empty,
};

export default Editor;
