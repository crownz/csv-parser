import React from 'react';

import parse from '../../libs/parse';
import validate from '../../libs/validate';
import Table from '../table';

import styles from './parser.css';

class Parser extends React.PureComponent {
  state = {
    csvInput: '',
    parsedData: [],
    hasHeader: false
  };

  handleCsvChange = e => this.setState({ csvInput: e.target.value });

  parseCsv = () => {
    const { csvInput } = this.state;
    const parsedData = parse(csvInput);
    this.setState({ parsedData });
  };

  toggleHeader = () => {
    this.setState(prevState => ({ hasHeader: !prevState.hasHeader }));
  };

  render() {
    const { csvInput, parsedData, hasHeader } = this.state;

    return (
      <div className={styles.container}>
        <div>
          <input type="checkbox" checked={hasHeader} onChange={this.toggleHeader} />
          Has header?
        </div>

        <textarea value={csvInput} onChange={this.handleCsvChange} className={styles.input} />
        <button type="button" onClick={this.parseCsv} disabled={!validate(csvInput)}>
          PARSE!
        </button>
        {parsedData && <Table data={parsedData} hasHeader={hasHeader} />}
      </div>
    );
  }
}

export default Parser;
