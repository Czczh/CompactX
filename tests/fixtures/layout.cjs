const classes = require('./classes.json');

module.exports = function layout(current, compact = false) {
  const c = value => current ? classes[value] || value : value;
  return `
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; color: white; font: 16px Arial; }
      #layout { display: grid; grid-template-columns: 72px 240px 1fr 240px; height: 600px; }
      #chat { min-width: 0; }
      #messages { padding: 12px; }
      h3 { font-size: 16px; font-weight: normal; margin: 0; }
      .${c('headerText_c19a55')} { display: inline; }
      .${c('timestamp_c19a55')} { font-size: 12px; margin-left: 6px; }
      .${c('timestampInline_c19a55')} { display: inline-block; }
      .${c('app_a3002d')}, .${c('app__160d8')}, .${c('base__5e434')},
      .${c('content__5e434')}, .${c('page__5e434')}, .${c('content_f75fb0')},
      .${c('container_c8ffbb')}, .${c('standardSidebarView__23e6b')},
      .${c('sidebarRegion__23e6b')}, .${c('contentRegion__23e6b')} { background: #313338; }
      .${c('bg__960e4')} { position: fixed; inset: 0; }
      .${c('chatContent_f75fb0')}, .${c('members_c8ffbb')},
      .${c('sidebarRegionScroller__23e6b')}, .${c('contentRegionScroller__23e6b')} {
        background: var(--background-base-lower, #313338);
      }
      #profile { --background-base-low: #654321; background: var(--background-base-low); }
    </style>
    <div id="app-mount">
      <div id="app" class="${c('app_a3002d')}">
        <div id="wallpaper" class="${c('bg__960e4')}"></div>
        <div id="innerApp" class="${c('app__160d8')}">
          <div id="base" class="${c('base__5e434')}">
            <div id="titlebar" class="${c('bar_c38106')}">Discord</div>
            <div id="appContent" class="${c('content__5e434')}">
              <div id="layout">
                <nav id="guilds" class="${c('guilds__5e434')}">
                  <div id="serverItem" class="${c('listItem__650eb')}">
                    <div id="serverIcon" class="${c('wrapper_cc5dd2')}">
                      <svg class="${c('svg_cc5dd2')}" width="48" height="48"><circle cx="24" cy="24" r="24"/></svg>
                    </div>
                  </div>
                </nav>
                <div id="sidebar" class="${c('sidebarList__5e434')}">
                  <div id="dm" class="${c('privateChannels_e6b769')}">
                    <div class="privateChannelsHeaderContainer_fixture"><h2 class="headerText_fixture">Direct Messages</h2></div>
                    <div id="dmScroller" class="${c('scroller__99e7c')}">Messages</div>
                  </div>
                </div>
                <div id="page" class="${c('page__5e434')}">
                  <section id="chat" class="${c('chat_f75fb0')}">
                    <div class="${c('subtitleContainer_f75fb0')}"><header id="chatHeader" class="${c('container__9293f')}">General</header></div>
                    <div id="chatOuter" class="${c('content_f75fb0')}">
                      <main id="chatContent" class="${c('chatContent_f75fb0')}">
                        <div id="messages" class="${c('messagesWrapper__36d07')}">
                          <article class="${c('wrapper_c19a55')}" data-list-item-id="chat-messages___1">
                            <h3 id="message-username-1" class="${c('header_c19a55')}">
                              <span id="headerText" class="${c('headerText_c19a55')}"><span id="username" class="${c('username_c19a55')}">Thomas</span></span>
                              ${compact ? '' : `<span class="${c('timestamp_c19a55')}">Today at 22:00</span>`}
                              <span id="pronouns" class="${c('timestampInline_c19a55')} ${c('timestamp_c19a55')}">• he/him</span>
                            </h3>
                            <div>Message content</div>
                          </article>
                        </div>
                        <div id="gradient" class="chatGradient_fixture">Gradient</div>
                      </main>
                    </div>
                  </section>
                </div>
                <aside id="memberContainer" class="${c('container_c8ffbb')}">
                  <div class="${c('membersWrap_c8ffbb')}"><div id="members" class="${c('members_c8ffbb')}">Members</div></div>
                </aside>
              </div>
              <section id="settings" class="${c('standardSidebarView__23e6b')}">
                <aside id="settingsSidebarWrap" class="${c('sidebarRegion__23e6b')}"><div id="settingsSidebar" class="${c('sidebarRegionScroller__23e6b')}">Settings</div></aside>
                <main id="settingsContentWrap" class="${c('contentRegion__23e6b')}"><div id="settingsContent" class="${c('contentRegionScroller__23e6b')}">Content</div></main>
              </section>
              <div id="profile" class="theme-dark custom-user-profile-theme">Custom profile</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
};
