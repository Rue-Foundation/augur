import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import App from 'modules/app/components/app/app'

import { selectNotificationsAndSeenCount } from 'modules/notifications/selectors/notifications'
import { selectMarketsHeader } from 'modules/markets/selectors/markets-header'
import { selectCoreStats } from 'modules/account/selectors/core-stats'
import { selectCategories } from 'modules/categories/selectors/categories'
import portfolio from 'modules/portfolio/selectors/portfolio'
import { updateIsMobile, updateIsMobileSmall } from 'modules/app/actions/update-is-mobile'
import { updateHeaderHeight } from 'modules/app/actions/update-header-height'
import { updateFooterHeight } from 'modules/app/actions/update-footer-height'
import getAllMarkets from 'modules/markets/selectors/markets-all'

const mapStateToProps = state => ({
  url: state.url,
  loginAccount: state.loginAccount,
  marketsHeader: selectMarketsHeader(state),
  portfolio: portfolio(),
  notifications: selectNotificationsAndSeenCount(state),
  coreStats: selectCoreStats(state),
  isLogged: state.isLogged,
  isMobile: state.isMobile,
  isMobileSmall: state.isMobileSmall,
  headerHeight: state.headerHeight,
  footerHeight: state.footerHeight,
  markets: getAllMarkets(),
  marketsFilteredSorted: state.marketsFilteredSorted,
  categories: selectCategories(state),
  selectedCategory: state.selectedCategory
})

const mapDispatchToProps = dispatch => ({
  updateIsMobile: isMobile => dispatch(updateIsMobile(isMobile)),
  updateIsMobileSmall: isMobileSmall => dispatch(updateIsMobileSmall(isMobileSmall)),
  updateHeaderHeight: headerHeight => dispatch(updateHeaderHeight(headerHeight)),
  updateFooterHeight: footerHeight => dispatch(updateFooterHeight(footerHeight))
})

const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

export default AppContainer
