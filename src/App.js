import React from 'react';
import client from './client';
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo';
import { ME, SEARCH_REPOSITORIES } from './graphql';

const DEFAULT_STATE = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: 'フロントエンドエンジニア'
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      ...DEFAULT_STATE,
      query: event.target.value
    })
  }

  render() {
    const { query, first, last, before, after } = this.state
    console.log({query})
    return (
      <ApolloProvider client={client}>
        <form>
          <input value={query} onChange={this.handleChange}></input>
        </form>
        <div>Hello, GraphQL</div>

        <Query
          query={SEARCH_REPOSITORIES}
          variables={{ query, first, last, before, after }}
        >
          {
            ({loading, error, data}) => {
              if (loading) return 'loading...';
              if (error) return `Error! ${error.message}`;

              const search = data.search;
              const repositoryCount = search.repositoryCount;
              const repositoryUnit = repositoryCount === 1 ? 'Repository' : 'Repositories';
              const title = `GitHub Repositories Search Results - ${data.search.repositoryCount} ${repositoryUnit}`
              return <h2>{title}</h2>
            }
          }
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
