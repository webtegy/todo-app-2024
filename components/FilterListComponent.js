import { View, TouchableOpacity , ScrollView } from 'react-native';
import Chip from './Chip';


export default function FilterList({clickEvent , selectedChip}){
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Chip clickEventFunc={clickEvent} active={selectedChip == 'Priority' ? true : false} emoji={'⚠️'} text={'Priority'} />
            <Chip clickEventFunc={clickEvent} active={selectedChip == 'Status' ? true : false } emoji={'⚡'} text={'Status'} />
            <Chip clickEventFunc={clickEvent} active={selectedChip == 'Category' ? true : false} emoji={'📁'} text={'Category'} />
        </ScrollView>
    )
}