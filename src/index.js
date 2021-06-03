import './sass/main.scss';
import debounce from 'lodash.debounce';
import countryTpl from './templates/country-card.hbs';
import countriesListTpl from './templates/coutries-list.hbs';
import API from './js/fetchCountries';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';


const refs = {
    searchInput: document.querySelector('#searchQuery'),
    countriesContainer: document.querySelector('.js-countries-container'),
}

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    const searchQuery = e.target.value;
    API.fetchCountries(searchQuery)
    .then(renderMarkup)
    .catch(onError)
}
function renderMarkup(countries){
    if (countries.length === 1) 
     {renderMarkupCountry(countries)} 
    else if (countries.length > 1 && countries.length <= 10) {
        renderMarkupCountries(countries)}
    else if (countries.length > 10) {
        errorMassage('Too many matches found. Please enter more specific query!')
        resetPage();
    } 
    else {errorMassage('Nothing was found for your query!')}
}
function renderMarkupCountry(country) {
    const markup = countryTpl(country);
    refs.countriesContainer.innerHTML = markup;
}
function renderMarkupCountries(arrayCountries) {
    const markup = countriesListTpl(arrayCountries);
    refs.countriesContainer.innerHTML = markup;
}
function onError() {
    errorMassage('Nothing was found for your query!');
    resetPage();
};


function errorMassage(message) {
        error ({
                title: `${message}`,
                delay: 1500,
            });
}

function resetPage() {
    refs.countriesContainer.innerHTML = '';
  }