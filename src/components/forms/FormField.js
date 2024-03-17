import React from 'react';
import {useFormikContext} from 'formik';
import {StyleSheet, TextInput} from 'react-native';
import ErrorMessage from './ErrorMessage';
import colors from '../../config/colors';

function AppFormField({
  name,
  state,
  autoCapitalize = 'none',
  autoCorrect = false,
  ...otherProps
}) {
  const {errors, touched} = useFormikContext();
  return (
    <>
      <TextInput
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        style={styles.input}
        value={state !== '' ? state : ''}
        {...otherProps}
      />
      <ErrorMessage
        error={errors[name]}
        visible={touched[name]}
        style={styles.text}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Marhey',
    fontSize: 16,
    flex: 1,
    color: colors.mainBrown,
  },
  input: {
    backgroundColor: colors.mainWhite,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default AppFormField;
