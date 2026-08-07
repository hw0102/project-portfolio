import { NativeTabs } from "expo-router/build/native-tabs";

const Layout = () => {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Label>home</NativeTabs.Trigger.Label>
        {/*<NativeTabs.Trigger.Icon src={icons.home} />*/}
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="chat">
        <NativeTabs.Trigger.Label>chat</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="bubble" md="chat" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.crop.circle" md="account_circle" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="rides">
        <NativeTabs.Trigger.Label>Rides</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="car" md="airport_shuttle" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default Layout;
