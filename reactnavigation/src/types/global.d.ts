import type {StackScreenProps} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Us: {
    name: string;
  };
};

type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;
type UsProps = StackScreenProps<RootStackParamList, 'Us'>;
