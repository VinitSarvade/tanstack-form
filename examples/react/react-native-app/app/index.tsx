import { Text, TextInput, View, Button, StyleSheet } from 'react-native'
import { useForm } from '@tanstack/react-form'

export default function Page() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value)
    },
  })

  return (
    <form.Provider>
      <View style={styles.container}>
        <View style={styles.form}>
          <form.Field
            name="firstName"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'A first name is required'
                  : value.length < 3
                    ? 'First name must be at least 3 characters'
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                return (
                  value.includes('error') && 'No "error" allowed in first name'
                )
              },
            }}
          >
            {({ state, handleChange }) => (
              <View>
                <Text>FirstName:</Text>
                <TextInput value={state.value} onChangeText={handleChange} />
                {state.meta.errors ? (
                  <Text>{state.meta.errors.join(', ')}</Text>
                ) : null}
              </View>
            )}
          </form.Field>

          <form.Field
            name="lastName"
            validators={{
              onChange: ({ value }) =>
                !value ? 'A Last name is required' : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                return (
                  value.includes('error') && 'No "error" allowed in last name'
                )
              },
            }}
          >
            {({ state, handleChange }) => (
              <View>
                <Text>Last Name:</Text>
                <TextInput value={state.value} onChangeText={handleChange} />
                {state.meta.errors ? (
                  <Text>{state.meta.errors.join(', ')}</Text>
                ) : null}
              </View>
            )}
          </form.Field>
          <Button onPress={form.submit}>Submit</Button>
        </View>
      </View>
    </form.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {
    gap: 20,
  },
})
