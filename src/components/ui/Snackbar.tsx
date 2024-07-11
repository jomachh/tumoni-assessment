import {Snackbar} from 'react-native-paper';
import {snackbarStyles} from '../../styles/ui/Snackbar.styles';
import {useSnackbar} from '../../hooks/useSnackbar';
import {useEffect} from 'react';

interface SnackbarProps {
  children: React.ReactNode;
}

export const SnackbarProvider = ({children}: SnackbarProps) => {
  const {message, type, visible, hide} = useSnackbar();

  useEffect(() => {
    console.log('visible', visible);
  }, [visible]);

  return (
    <>
      {children}
      <Snackbar
        wrapperStyle={snackbarStyles.wrapper}
        visible={visible}
        duration={5000}
        onDismiss={() => hide()}
        style={snackbarStyles[type]}>
        {message}
      </Snackbar>
    </>
  );
};
