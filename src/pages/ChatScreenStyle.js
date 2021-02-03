import { theme } from './themeConstants.js';

export default {
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  centerAlign: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerOuterBlock: {
    alignItems: 'center', justifyContent: 'flex-end', backgroundColor: theme.primaryColor, height: '10%'
  },
  headerBlock: {
    flexDirection: 'row', paddingTop: 20, paddingBottom: 10, width: '100%'
  },
  goBackBlock: {
    width: 50, alignItems: 'center', justifyContent: 'center'
  },
  imgUser: {
    width: 50, height: 50, resizeMode: 'cover', borderRadius: 50, marginLeft: 10,
  },
  nameText: {
    marginBottom: 2, color: '#fff', fontSize: 16, fontWeight: 'bold'
  },
  usernameText: {
    fontStyle: 'italic', marginBottom: 2, color: '#f2f2f2', fontSize: 14, fontWeight: 'normal'
  },
  menuIconBlock: {
    flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end', paddingRight: 20
  },
  menuIcon: {
    marginBottom: 2, color: '#f2f2f2', fontSize: 25, fontWeight: 'bold'
  },
  searchInputBlockWrapper: {
    flex: 7, justifyContent: 'center'
  },
  searchInputBlock: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderWidth: 0,
    margin: 5,
    marginLeft: 20,
    borderRadius: 20,
    height: 40,
    alignItems: 'center',
    paddingLeft: 20,
    borderWidth: 0,
    borderColor: '#C8C8C8'
  },
  footerBlockWrapper: {
    marginBottom: 0, width: '100%', alignItems: 'flex-start', backgroundColor: theme.chatBackground, height: '8%'
  },
  footerBlock: {
    width: '100%', flexDirection: 'row'
  },
  footerIconsWrapper: {
    flex: 2, justifyContent: 'center'
  },
  footerIconsBlock: {
    flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 10
  },
  friendBlock: {
    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'
  },
  friendTimeBlock: {
    position: 'absolute', top: -15, left: 5, alignItems: 'flex-start', justifyContent: 'center', width: 100
  },
  userBlock: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'
  },
  userTimeBlock: {
    position: 'absolute', top: -15, right: 5, alignItems: 'flex-end', justifyContent: 'center', width: 100
  },
  timestampText: {
    fontSize: 10, fontStyle: 'italic', color: '#888888'
  },
  textStyle1: {
    color: '#696969',
    fontSize: 14,
    fontWeight: 'normal'
  },
  agentMsgBlock: {
    marginLeft: 20,
    backgroundColor: theme.secondaryColor,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 10,
  },
  agentMsgText: {
    maxWidth: 200,
    marginTop: 2,
    color: '#696969',
    fontWeight: 'normal',
    fontSize: 13
  },
  userMsgBlock: {
    marginRight: 20,
    backgroundColor: theme.primaryColor,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 10
  },
  userMsgText: {
    maxWidth: 200,
    marginTop: 2,
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 13
  }
};
