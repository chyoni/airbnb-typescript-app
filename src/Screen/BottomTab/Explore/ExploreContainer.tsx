import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import SearchBar from "../../../Components/SearchBar";
import ExplorePresenter from "./ExplorePresenter";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
interface IStates {
  term: string;
  shouldFetch: boolean;
}

class ExploreContainer extends React.Component<IProps, IStates> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <SearchBar
        value={navigation.getParam("term", "")}
        onChangeText={navigation.getParam("onChangeText", () => null)}
        onSubmitEditing={navigation.getParam("onSubmit", () => null)}
      />
    )
  });

  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      term: "",
      shouldFetch: false
    };
    navigation.setParams({
      term: this.state.term,
      onChangeText: this.onChangeText,
      onSubmit: this.onSubmit
    });
  }
  onChangeText = text => {
    const { navigation } = this.props;
    this.setState({ term: text, shouldFetch: false });
    navigation.setParams({ term: text });
  };
  onSubmit = () => {
    this.setState({ shouldFetch: true });
  };
  render() {
    const { term, shouldFetch } = this.state;
    return <ExplorePresenter term={term} shouldFetch={shouldFetch} />;
  }
}

export default ExploreContainer;
