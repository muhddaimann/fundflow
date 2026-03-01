import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Surface, MD3LightTheme } from 'react-native-paper';
import { router, usePathname } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function NavBar() {
  const pathname = usePathname();

  // Map pathnames to active state
  const isHome = pathname === '/';
  const isSettings = pathname === '/settings';

  // Conditional middle icon and action
  const middleIcon = isHome ? "plus" : "logout";
  const middleAction = () => {
    if (isHome) {
      console.log('Plus Pressed - Add Item Logic');
    } else {
      console.log('Logout Pressed - Sign Out Logic');
      // Add auth.signOut() here
    }
  };

  const NavItem = ({ icon, isActive, onPress, isCenter = false }: any) => (
    <Pressable onPress={onPress} style={[styles.navItem, isCenter && styles.centerItem]}>
      <Surface 
        style={[
          styles.iconContainer, 
          isActive && styles.activeIconContainer,
          isCenter && styles.centerIconContainer
        ]} 
        elevation={isCenter ? 4 : 0}
      >
        <MaterialCommunityIcons 
          name={icon} 
          size={isCenter ? 32 : 26} 
          color={isCenter ? 'white' : (isActive ? MD3LightTheme.colors.primary : '#757575')} 
        />
      </Surface>
    </Pressable>
  );

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <Surface style={styles.container} elevation={5}>
        <NavItem 
          icon="home" 
          isActive={isHome} 
          onPress={() => router.push('/')} 
        />
        
        <NavItem 
          icon={middleIcon} 
          isCenter 
          onPress={middleAction} 
        />

        <NavItem 
          icon="cog" 
          isActive={isSettings} 
          onPress={() => router.push('/settings')} 
        />
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '85%',
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 30, // Floating height from bottom
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  activeIconContainer: {
    backgroundColor: '#f0f4ff',
  },
  centerItem: {
    marginTop: -40, // Raise the center button
  },
  centerIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: MD3LightTheme.colors.primary,
  }
});
