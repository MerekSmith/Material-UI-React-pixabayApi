import React, { Component } from "react";
import { TextField, SelectField, MenuItem } from "material-ui";
import axios from "axios";

import ImageResults from "../image-results/ImageResults";

class Search extends Component {
  state = {
    searchText: "",
    amount: 15,
    apiUrl: "https://pixabay.com/api",
    apiKey: "13745791-3d82747dd5b03cf3925361971",
    images: []
  };

  onTextChange = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ images: [] });
      } else {
        const { apiUrl, apiKey, searchText, amount } = this.state;
        axios
          .get(
            `${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}&safesearch=true`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      }
    });
  };

  onAmountChange = (e, index, value) => {
    this.setState({ amount: value });
  };

  render() {
    return (
      <div className='search-container'>
        <TextField
          name='searchText'
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText='Search for Images'
          fullWidth={true}
        />
        <br />
        <SelectField
          name='amount'
          floatingLabelText='Amount'
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText='5' />
          <MenuItem value={10} primaryText='10' />
          <MenuItem value={15} primaryText='15' />
          <MenuItem value={30} primaryText='30' />
          <MenuItem value={50} primaryText='50' />
        </SelectField>
        <br />
        {this.state.images.length > 0 && (
          <ImageResults images={this.state.images} />
        )}
      </div>
    );
  }
}

export default Search;
