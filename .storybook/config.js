import { configure } from '@storybook/react';
import 'sanitize.css/sanitize.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../app/global-styles';

function loadStories() {
  require('../stories/TaggedInput.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
