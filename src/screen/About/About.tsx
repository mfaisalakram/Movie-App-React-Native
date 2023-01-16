import React from 'react'

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color } from 'types';

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const list = [
    {
        id: 1,
        heading: '1. Personal and non-personal information.',
        paragraph: `We understand the importance of our users personal information, and more importantly the information pertaining to children under 13 years of age. We do not collect or require users to enter their personal information when using our Products. We do not collect any personal information from children with our Products. When using our Products, we might read non-personal information (such as internet, Wi-Fi availability, network connection, wake lock, device status, internal and external storage availability and usability) for the use of Product development and Service improvement. The collection of information will be used for the development and functional improvement of our Products to ensure quality user experience. We only collect such information to the extent that allow us to conduct our normal business operation and Products research and development. Any information we received will be used internally for the purpose of product development and to third parties performing services on our behalf, who comply with our Privacy Policy. We will not disclose your information publicly unless we have received your consent or under government order.`
    },
    {
        id: 2,
        heading: `2. COPPA`,
        paragraph: `We comply with the Children's Online Privacy Protection Act. We do not knowingly collect personal information on children under the age of 13. When a user identifies himself or herself as a child under the age of 13 through a support request or through any feedback, we will not collect, store or use, and will delete in a secure manner, any personal information of such user`
    },
    {
        id: 3,
        heading: `3. Cookies.`,
        paragraph: `We do not use cookies.`
    },
    {
        id: 4,
        heading: `4. Third party websites and links.`,
        paragraph: `We may provide links to our website or third party websites. Our Privacy Policy will have no effect on any third party websites privacy policy or their usage of personal information collected. Our Privacy Policy as expressed herein does not apply to other parties, and we do not dictate the collection or usage of information by them. We do not take part in the operation of third party advertisers or websites.`
    },
    {
        id: 5,
        heading: `5. Amendments.`,
        paragraph: `We may amend our privacy policy from time to time by posting the amended Policy on our website, without directly informing our users. Therefore we encourage our users to review this policy frequently. We reserves all rights and interpretation to the Policy and its amendments.`
    },
    {
        id: 6,
        heading: `6. Contact Us`,
        paragraph: `If there are any questions regarding this privacy policy you may contact us using the information below. We love hearing your voice. Let's contact us and stay connected! Get in touch with me for support via: Email: donghocat 13c@gmail.com`
    },
]
const About = () => {
    const navigation = useNavigation()
    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Setting') }}><AntDesign name="left" style={styles.backlogo} /></TouchableOpacity>
                    <Text style={styles.privacyText}>Privacy</Text>
                    <Text></Text>
                </View>
                <View style={styles.innercontainer}>

                    <Text style={styles.mainHeading}>PRIVACY POLICY</Text>

                    {list.map(({ id, heading, paragraph }) => (

                        <View style={styles.section} key={id}>
                            <Text style={styles.heading}>{heading}</Text>
                            <Text style={styles.paragraph}>
                                {paragraph}
                            </Text>

                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

export default About;

const styles = StyleSheet.create({
    scrollView: { backgroundColor: 'red', flex: 1, },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', textAlign: 'center', alignItems: 'center', height: 50, paddingHorizontal: 20 },
    backlogo: { color: Color.white, fontSize: 20 },
    privacyText: { color: Color.white, fontSize: 18, textTransform: 'uppercase' },
    container: {
        flex: 1,
        backgroundColor: Color.purple1,
    },
    innercontainer: {
        flex: 1,
        backgroundColor: Color.white,
        paddingHorizontal: 10,
    },
    mainHeading: { fontSize: 24, marginBottom: 14, fontWeight: 'bold' }, section: { marginBottom: 6 }, heading: { fontSize: 12, fontWeight: 'bold' }, paragraph: { fontSize: 10, textAlign: 'left' }
})