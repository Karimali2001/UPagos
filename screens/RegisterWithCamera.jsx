import { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  WrapLoading,
  StyleSheet,
  ToastAndroid
} from 'react-native'
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import RNTextDetector from 'rn-text-detector'
import * as ImagePicker from 'expo-image-picker'

const RegisterWithCamera = () => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions()
  const [state, setState] = useState({
    loading: false,
    image: null,
    textRecognition: null,
    toast: {
      message: '',
      isVisible: false
    }
  })

  async function openCamera() {
    const options = {
      mediaType: 'photo'
    }

    alert('OpenCamera')

    await launchCamera(options, (response) => {
      console.log(response)
    })
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  async function onImageSelect(media) {
    if (!media) {
      setState({ ...state, loading: false })
      return
    }
    if (!!media && media.assets) {
      const file = media.assets[0].uri
      const textRecognition = await RNTextDetector.detectFromUri(file)
      const INFLIGHT_IT = 'Inflight IT'
      //if match toast will appear
      const matchText = textRecognition.findIndex((item) =>
        item.text.match(INFLIGHT_IT)
      )
      setState({
        ...state,
        textRecognition,
        image: file,
        toast: {
          message: matchText > -1 ? 'Ohhh i love this company!!' : '',
          isVisible: matchText > -1
        },
        loading: false
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>RN OCR SAMPLE</Text>
        <View>
          <TouchableOpacity
            style={[styles.submitButton]}
            onPress={() => openCamera()}
          >
            <Text style={[styles.buttonText]}>Take Photo</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={[styles.submitButton]}
              onPress={() => pickImage()}
            >
              <Text style={[styles.buttonText]}>Pick a Photo</Text>
            </TouchableOpacity>
          </View>
          <View>
            {/* <WrapLoading loading={state.loading}> */}
            <View style={{ alignItems: 'center' }}>
              <Image
                style={[styles.image, styles.shadow]}
                source={{ uri: state.image }}
              />
            </View>
            {!!state.textRecognition &&
              state.textRecognition.map((item, i) => (
                <Text key={i}>{item.text}</Text>
              ))}
            {/* </WrapLoading> */}
          </View>
        </View>
        {state.toast.isVisible &&
          ToastAndroid.showWithGravityAndOffset(
            state.toast.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8280A3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#F99417',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    paddingTop: 0,
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20, // Margin on the sides
    marginBottom: 10
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5', // Background color
    marginRight: 10
  },
  tableContainer: {
    backgroundColor: '#C4C3CF',
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  tableTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    width: '80%' // Set the width to 100%
  },
  tableRowAlternate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: '#C4C3CF',
    padding: 10,
    borderRadius: 8,
    width: '80%' // Set the width to 100%
  },
  tableLeftTitle: {
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 10
  },
  tableRightItem: {
    color: 'black',
    flex: 2
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  submitButton: {
    backgroundColor: '#F99417',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20
  }
})

export default RegisterWithCamera
