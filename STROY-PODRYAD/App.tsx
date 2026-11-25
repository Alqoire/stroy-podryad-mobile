
import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  House,
  UsersRound,
  CalendarDays,
  Building2,
  UserRound,
  Plus,
  Bell,
  ArrowUpRight,
  Clock3,
  BriefcaseBusiness,
  ChevronRight,
  CheckCircle2,
  Search,
  Phone,
  CalendarCheck,
} from 'lucide-react-native';

import type { LucideIcon } from 'lucide-react-native';

// --------------------------------------------------
// COLORS
// --------------------------------------------------

const C = {
  bg: '#101115',
  surface: '#181A20',
  surface2: '#202229',
  border: '#292C35',
  orange: '#FF8A32',
  orangeSoft: '#3A281D',
  text: '#F4F4F5',
  muted: '#858894',
  green: '#45C486',
  red: '#E56D6D',
};

// --------------------------------------------------
// NAVIGATION
// --------------------------------------------------

type TabId = 'home' | 'candidates' | 'meetings' | 'objects' | 'profile';

const tabs: {
  id: TabId;
  label: string;
  icon: LucideIcon;
}[] = [
  { id: 'home', label: 'Главная', icon: House },
  { id: 'candidates', label: 'Кандидаты', icon: UsersRound },
  { id: 'meetings', label: 'Встречи', icon: CalendarDays },
  { id: 'objects', label: 'Объекты', icon: Building2 },
  { id: 'profile', label: 'Профиль', icon: UserRound },
];

// --------------------------------------------------
// MAIN APP
// --------------------------------------------------

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.app}>
        <View style={styles.content}>
          {activeTab === 'home' && <HomeScreen />}
          {activeTab === 'candidates' && <CandidatesScreen />}
          {activeTab === 'meetings' && <MeetingsScreen />}
          {activeTab === 'objects' && <ObjectsScreen />}
          {activeTab === 'profile' && <ProfileScreen />}
        </View>

        <View style={styles.bottomNav}>
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <Pressable
                key={tab.id}
                style={styles.tab}
                onPress={() => setActiveTab(tab.id)}
              >
                <View
                  style={[
                    styles.tabIconWrap,
                    active && styles.activeTabIconWrap,
                  ]}
                >
                  <Icon
                    size={23}
                    color={active ? C.orange : C.muted}
                    strokeWidth={active ? 2.3 : 1.8}
                  />
                </View>

                <Text
                  style={[
                    styles.tabLabel,
                    active && styles.activeTabLabel,
                  ]}
                >
                  {tab.label}
                </Text>

                {active && <View style={styles.activeIndicator} />}
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

// --------------------------------------------------
// REUSABLE COMPONENTS
// --------------------------------------------------

function Header({ title, subtitle }: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.brand}>STROY PODRYAD</Text>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>

      <Pressable style={styles.bellButton}>
        <Bell size={21} color={C.text} strokeWidth={1.8} />
        <View style={styles.notificationDot} />
      </Pressable>
    </View>
  );
}

function SectionTitle({ title, action }: {
  title: string;
  action?: string;
}) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Text style={styles.sectionAction}>{action}</Text>
      ) : null}
    </View>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Icon size={28} color={C.orange} strokeWidth={1.7} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDescription}>{description}</Text>
    </View>
  );
}

function StatCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statTop}>
        <Text style={styles.statLabel}>{label}</Text>
        <Icon size={18} color={C.orange} strokeWidth={1.8} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statDetail}>{detail}</Text>
    </View>
  );
}

// --------------------------------------------------
// HOME
// --------------------------------------------------

function HomeScreen() {
  const date = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  });

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Header title="Главная" subtitle="Панель управления" />

      <View style={styles.welcomeCard}>
        <View style={styles.welcomeTop}>
          <View>
            <Text style={styles.welcomeEyebrow}>ВАШЕ РАБОЧЕЕ ПРОСТРАНСТВО</Text>
            <Text style={styles.welcomeTitle}>Добро пожаловать!</Text>
          </View>
          <View style={styles.welcomeIcon}>
            <BriefcaseBusiness size={24} color={C.orange} />
          </View>
        </View>
        <Text style={styles.welcomeDate}>{date}</Text>
      </View>

      <SectionTitle title="Общая статистика" />

      <View style={styles.statsGrid}>
        <StatCard
          label="Кандидаты"
          value="0"
          detail="Всего в базе"
          icon={UsersRound}
        />
        <StatCard
          label="Встречи"
          value="0"
          detail="Запланировано"
          icon={CalendarDays}
        />
        <StatCard
          label="На объектах"
          value="0"
          detail="Активные сотрудники"
          icon={BriefcaseBusiness}
        />
        <StatCard
          label="Объекты"
          value="0"
          detail="Активные проекты"
          icon={Building2}
        />
      </View>

      <SectionTitle title="Быстрые действия" />

      <View style={styles.actionsGrid}>
        <ActionCard
          icon={Plus}
          title="Добавить кандидата"
          subtitle="Новая запись"
        />
        <ActionCard
          icon={CalendarCheck}
          title="Создать встречу"
          subtitle="Запись на объект"
        />
        <ActionCard
          icon={Search}
          title="Найти кандидата"
          subtitle="Поиск по базе"
        />
        <ActionCard
          icon={Building2}
          title="Объекты"
          subtitle="Список проектов"
        />
      </View>

      <SectionTitle title="Ближайшие встречи" action="Все встречи" />

      <View style={styles.card}>
        <EmptyState
          icon={CalendarDays}
          title="Пока нет встреч"
          description="Здесь будут отображаться ближайшие встречи с кандидатами."
        />
      </View>

      <View style={styles.footerSpace} />
    </ScrollView>
  );
}

function ActionCard({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <Pressable style={styles.actionCard}>
      <View style={styles.actionIcon}>
        <Icon size={21} color={C.orange} strokeWidth={1.9} />
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionSubtitle}>{subtitle}</Text>
      <ArrowUpRight
        size={15}
        color={C.muted}
        style={styles.actionArrow}
      />
    </Pressable>
  );
}

// --------------------------------------------------
// CANDIDATES
// --------------------------------------------------

function CandidatesScreen() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Header title="Кандидаты" subtitle="База соискателей" />

      <View style={styles.searchBox}>
        <Search size={19} color={C.muted} />
        <Text style={styles.searchPlaceholder}>
          Поиск по имени или телефону
        </Text>
      </View>

      <View style={styles.filterRow}>
        <View style={styles.filterActive}>
          <Text style={styles.filterActiveText}>Все</Text>
        </View>
        <View style={styles.filter}>
          <Text style={styles.filterText}>Новые</Text>
        </View>
        <View style={styles.filter}>
          <Text style={styles.filterText}>В работе</Text>
        </View>
        <View style={styles.filter}>
          <Text style={styles.filterText}>Отказ</Text>
        </View>
      </View>

      <View style={styles.pageStats}>
        <Text style={styles.pageStatsLabel}>Всего кандидатов</Text>
        <Text style={styles.pageStatsValue}>0</Text>
      </View>

      <View style={styles.card}>
        <EmptyState
          icon={UsersRound}
          title="Кандидатов пока нет"
          description="Добавленные соискатели будут отображаться здесь."
        />
      </View>

      <View style={styles.footerSpace} />
    </ScrollView>
  );
}

// --------------------------------------------------
// MEETINGS
// --------------------------------------------------

function MeetingsScreen() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Header title="Встречи" subtitle="Календарь и записи" />

      <View style={styles.meetingHighlight}>
        <View style={styles.meetingHighlightIcon}>
          <CalendarDays size={25} color={C.orange} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.meetingHighlightTitle}>
            Управление встречами
          </Text>
          <Text style={styles.meetingHighlightText}>
            Все запланированные встречи в одном месте
          </Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          label="Сегодня"
          value="0"
          detail="Встреч"
          icon={Clock3}
        />
        <StatCard
          label="Всего"
          value="0"
          detail="Запланировано"
          icon={CalendarCheck}
        />
      </View>

      <SectionTitle title="Расписание" />

      <View style={styles.card}>
        <EmptyState
          icon={CalendarDays}
          title="Расписание пустое"
          description="Здесь появятся встречи с кандидатами, даты, время и место проведения."
        />
      </View>

      <View style={styles.footerSpace} />
    </ScrollView>
  );
}

// --------------------------------------------------
// OBJECTS
// --------------------------------------------------

function ObjectsScreen() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Header title="Объекты" subtitle="Строительные проекты" />

      <View style={styles.objectBanner}>
        <View style={styles.objectBannerIcon}>
          <Building2 size={29} color={C.orange} strokeWidth={1.7} />
        </View>
        <Text style={styles.objectBannerTitle}>
          Строительные объекты
        </Text>
        <Text style={styles.objectBannerText}>
          Управляйте проектами, вакансиями и потребностью в сотрудниках.
        </Text>
      </View>

      <SectionTitle title="Мои объекты" />

      <View style={styles.statsGrid}>
        <StatCard
          label="Активные"
          value="0"
          detail="Объектов"
          icon={Building2}
        />
        <StatCard
          label="Вакансии"
          value="0"
          detail="Открыто"
          icon={BriefcaseBusiness}
        />
      </View>

      <View style={styles.card}>
        <EmptyState
          icon={Building2}
          title="Объектов пока нет"
          description="Здесь будут строительные объекты, условия работы, вакансии и потребность в людях."
        />
      </View>

      <View style={styles.footerSpace} />
    </ScrollView>
  );
}

// --------------------------------------------------
// PROFILE
// --------------------------------------------------

function ProfileScreen() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Header title="Профиль" subtitle="Личный кабинет" />

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <UserRound size={35} color={C.orange} strokeWidth={1.6} />
        </View>
        <Text style={styles.profileName}>Пользователь</Text>
        <Text style={styles.profileRole}>Рекрутер</Text>
        <View style={styles.onlineBadge}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Активный аккаунт</Text>
        </View>
      </View>

      <SectionTitle title="Мой профиль" />

      <View style={styles.menuCard}>
        <MenuItem icon={UserRound} title="Личные данные" />
        <MenuItem icon={Phone} title="Контактная информация" />
        <MenuItem icon={Bell} title="Уведомления" />
        <MenuItem icon={CheckCircle2} title="Настройки приложения" />
      </View>

      <View style={styles.version}>
        <Text style={styles.versionText}>STROY PODRYAD MOBILE</Text>
        <Text style={styles.versionNumber}>Версия 1.0.0 · Prototype</Text>
      </View>

      <View style={styles.footerSpace} />
    </ScrollView>
  );
}

function MenuItem({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <Pressable style={styles.menuItem}>
      <View style={styles.menuItemIcon}>
        <Icon size={19} color={C.orange} strokeWidth={1.8} />
      </View>
      <Text style={styles.menuItemTitle}>{title}</Text>
      <ChevronRight size={18} color={C.muted} />
    </Pressable>
  );
}

// --------------------------------------------------
// STYLES
// --------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.bg,
  },

  app: {
    flex: 1,
    backgroundColor: C.bg,
  },

  content: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  brand: {
    color: C.orange,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 8,
  },

  headerTitle: {
    color: C.text,
    fontSize: 27,
    fontWeight: '800',
    letterSpacing: -0.6,
  },

  headerSubtitle: {
    color: C.muted,
    fontSize: 13,
    marginTop: 4,
  },

  bellButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: C.orange,
  },

  welcomeCard: {
    backgroundColor: C.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: C.border,
    padding: 20,
    marginBottom: 27,
  },

  welcomeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  welcomeEyebrow: {
    fontSize: 9,
    color: C.orange,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 9,
  },

  welcomeTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: C.text,
  },

  welcomeIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: C.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeDate: {
    color: C.muted,
    fontSize: 12,
    marginTop: 17,
    textTransform: 'capitalize',
  },

  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 3,
  },

  sectionTitle: {
    color: C.text,
    fontSize: 17,
    fontWeight: '800',
  },

  sectionAction: {
    color: C.orange,
    fontSize: 12,
    fontWeight: '600',
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  statCard: {
    width: '48.2%',
    backgroundColor: C.surface,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: C.border,
    padding: 15,
    marginBottom: 10,
    minHeight: 112,
  },

  statTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statLabel: {
    color: C.muted,
    fontSize: 11,
    fontWeight: '600',
  },

  statValue: {
    color: C.text,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 10,
  },

  statDetail: {
    color: C.muted,
    fontSize: 10,
    marginTop: 2,
  },

  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  actionCard: {
    width: '48.2%',
    backgroundColor: C.surface,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    marginBottom: 10,
    minHeight: 126,
    position: 'relative',
  },

  actionIcon: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: C.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  actionTitle: {
    color: C.text,
    fontSize: 12,
    fontWeight: '700',
    paddingRight: 5,
  },

  actionSubtitle: {
    color: C.muted,
    fontSize: 10,
    marginTop: 5,
  },

  actionArrow: {
    position: 'absolute',
    right: 12,
    top: 14,
  },

  card: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 19,
    padding: 15,
    marginBottom: 15,
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
    paddingHorizontal: 15,
  },

  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 19,
    backgroundColor: C.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  emptyTitle: {
    color: C.text,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },

  emptyDescription: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 7,
  },

  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#17181D',
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 10,
    paddingBottom: 9,
    paddingHorizontal: 5,
    minHeight: 77,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    position: 'relative',
  },

  tabIconWrap: {
    width: 42,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeTabIconWrap: {
    backgroundColor: C.orangeSoft,
  },

  tabLabel: {
    color: C.muted,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },

  activeTabLabel: {
    color: C.orange,
    fontWeight: '800',
  },

  activeIndicator: {
    position: 'absolute',
    top: -10,
    width: 25,
    height: 3,
    borderRadius: 3,
    backgroundColor: C.orange,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 49,
    marginBottom: 15,
  },

  searchPlaceholder: {
    color: C.muted,
    fontSize: 12,
    marginLeft: 10,
  },

  filterRow: {
    flexDirection: 'row',
    marginBottom: 22,
    gap: 8,
  },

  filterActive: {
    backgroundColor: C.orange,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },

  filterActiveText: {
    color: '#17181D',
    fontSize: 11,
    fontWeight: '800',
  },

  filter: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  filterText: {
    color: C.muted,
    fontSize: 11,
    fontWeight: '600',
  },

  pageStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  pageStatsLabel: {
    color: C.muted,
    fontSize: 13,
  },

  pageStatsValue: {
    color: C.text,
    fontSize: 21,
    fontWeight: '800',
  },

  meetingHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    padding: 17,
    marginBottom: 22,
  },

  meetingHighlightIcon: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: C.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  meetingHighlightTitle: {
    color: C.text,
    fontSize: 14,
    fontWeight: '800',
  },

  meetingHighlightText: {
    color: C.muted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },

  objectBanner: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 21,
    padding: 20,
    marginBottom: 25,
  },

  objectBannerIcon: {
    width: 55,
    height: 55,
    borderRadius: 17,
    backgroundColor: C.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  objectBannerTitle: {
    color: C.text,
    fontSize: 19,
    fontWeight: '800',
  },

  objectBannerText: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
  },

  profileCard: {
    alignItems: 'center',
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 21,
    padding: 25,
    marginBottom: 27,
  },

  avatar: {
    width: 78,
    height: 78,
    borderRadius: 26,
    backgroundColor: C.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  profileName: {
    color: C.text,
    fontSize: 19,
    fontWeight: '800',
  },

  profileRole: {
    color: C.muted,
    fontSize: 12,
    marginTop: 5,
  },

  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D3029',
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginTop: 15,
  },

  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: C.green,
    marginRight: 7,
  },

  onlineText: {
    color: C.green,
    fontSize: 10,
    fontWeight: '700',
  },

  menuCard: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 18,
    paddingHorizontal: 15,
    marginBottom: 25,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },

  menuItemIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: C.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  menuItemTitle: {
    flex: 1,
    color: C.text,
    fontSize: 12,
    fontWeight: '600',
  },

  version: {
    alignItems: 'center',
    paddingVertical: 15,
  },

  versionText: {
    color: C.muted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  versionNumber: {
    color: '#555862',
    fontSize: 10,
    marginTop: 6,
  },

  footerSpace: {
    height: 15,
  },
});
