import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { getBlockComponent } from './src/registry';
import { payload as backToSchool } from './src/payloads/back-to-school';
import { payload as summerPlayhouse } from './src/payloads/summer-playhouse';
import { payload as mysteryCarnival } from './src/payloads/mystery-carnival';
import { handleAction } from './src/actions/dispatcher';
import { ThemeProvider } from './src/theme/ThemeContext';
import { FullScreenOverlay } from './src/blocks/FullScreenOverlay';
import type { Block, CampaignPayload } from './src/types/sdui';

const CAMPAIGNS: CampaignPayload[] = [
  backToSchool,
  summerPlayhouse,
  mysteryCarnival,
];

export default function App() {
  const [activePayload, setActivePayload] =
    useState<CampaignPayload>(backToSchool);

  const { theme } = activePayload;

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.switcher}>
          {CAMPAIGNS.map((campaign) => {
            const isActive = campaign.campaignId === activePayload.campaignId;
            return (
              <Pressable
                key={campaign.campaignId}
                onPress={() => setActivePayload(campaign)}
                style={[
                  styles.tab,
                  {
                    backgroundColor: isActive ? theme.primary : 'transparent',
                    borderColor: theme.primary,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.tabLabel,
                    { color: isActive ? theme.background : theme.primary },
                  ]}
                >
                  {campaign.campaignName}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <FlashList
          data={activePayload.blocks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: Block }) => {
            const Component = getBlockComponent(item.type);
            if (!Component) return null;
            return <Component block={item} onAction={handleAction} />;
          }}
        />

        {activePayload.overlay && (
          <FullScreenOverlay block={activePayload.overlay} />
        )}

        <StatusBar style="auto" />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switcher: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
