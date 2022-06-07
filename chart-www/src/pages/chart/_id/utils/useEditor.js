import { useEffect, useState } from 'react';
import keywords from '../data/keywords';

const useEditor = ({ ref, code }) => {
  const [loading, setLoading] = useState(true);
  const [editorInstance, setEditorInstance] = useState(null);

  // 初始化编辑器
  const initEditorHandle = async () => {
    try {
      const { acequire, edit } = await import(/* webpackChunkName: "ace" */'brace');

      await Promise.all([
        import(/* webpackChunkName: "ace-plugin" */'brace/mode/javascript'),
        import(/* webpackChunkName: "ace-plugin" */'brace/ext/language_tools'),
        import(/* webpackChunkName: "ace-plugin" */'brace/snippets/javascript'),
      ]);

      // 代码提示
      const languageTools = acequire('ace/ext/language_tools');
      languageTools.addCompleter({
        getCompletions: (editors, session, pos, prefix, callback) => {
          if (prefix.length === 0) {
            return callback(null, []);
          }
          return callback(null, keywords.map((row) => ({
            caption: row.name,
            value: row.name,
            score: row.count,
            metal: 'local',
          })));
        },
      });

      const ins = edit(ref.current);
      ins.setValue(code);

      ins.session.setMode('ace/mode/javascript');
      ins.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        tabSize: 2,
        enableLiveAutocompletion: true,
      });

      ins.$blockScrolling = Infinity;

      setEditorInstance(ins);

      setLoading(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
    }
  };

  // 销毁编辑器
  const destroyEditorHandle = () => {
    if (!editorInstance) return;

    editorInstance.destroy();
    return setEditorInstance(null);
  };

  useEffect(() => {
    initEditorHandle();

    return destroyEditorHandle;
  }, []);

  return {
    editor: editorInstance,
    loading,
  };
};

export default useEditor;
