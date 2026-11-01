export type Language = 'en' | 'fr' | 'es' | 'zh';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇨🇦' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳' },
];

export const translations = {
  en: {
    // Nav & Common
    settings: 'Settings',
    roster: 'Roster',
    timeline: 'Timeline',
    printPdf: 'Print / Export PDF',
    backupTransfer: 'Backup & Transfer',
    resetTimers: 'Reset Timers',
    reset: 'Reset',
    flipField: 'Flip Field',
    goal: 'Goal',
    halfway: 'Halfway',
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    confirm: 'Confirm',
    delete: 'Delete',
    loading: 'Loading...',

    // Match Clock
    matchClock: 'Match Clock',
    startClock: 'Start',
    pauseClock: 'Pause',
    resetClock: 'Reset Clock to 00:00',
    period: 'Period',
    period_1st_half: '1st Half',
    period_2nd_half: '2nd Half',
    period_extra_time: 'Extra Time',
    period_extra_time_1: 'Extra Time 1',
    period_extra_time_2: 'Extra Time 2',
    period_sudden_death: 'Sudden Death',
    period_penalties: 'Penalties',
    period_1st_per: '1st Per',
    period_2nd_per: '2nd Per',
    period_3rd_per: '3rd Per',
    period_ot: 'OT',
    period_shootout: 'Shootout',
    period_1st_qtr: '1st Qtr',
    period_2nd_qtr: '2nd Qtr',
    period_3rd_qtr: '3rd Qtr',
    period_4th_qtr: '4th Qtr',

    // Sports
    sport_soccer: 'Soccer',
    sport_hockey: 'Ice Hockey',
    sport_lacrosse: 'Lacrosse',
    sport_field_hockey: 'Field Hockey',
    sport_rugby: 'Rugby',
    sport_select_prompt: 'Select Field Sport',
    sport_change_warning: 'Changing sports updates field markings and period formats.',
    load_preset_roster: 'Load standard roster preset for this sport',
    load_preset_confirm: 'Do you also want to load the starter lineup preset for this sport?',

    // Settings Modal
    settings_title: 'Settings & Preferences',
    language: 'Language',
    field_sport: 'Sport & Pitch Layout',
    goal_orientation: 'Goal Side',
    goal_left: 'Goal on Left (Attacking Right)',
    goal_right: 'Goal on Right (Attacking Left)',
    sound_effects: 'Sound Effects (Whistle)',
    sound_enabled: 'Audio Enabled',
    sound_muted: 'Muted',
    app_info: 'Application Info',
    version: 'Version',
    offline_ready: 'Offline Ready (PWA)',

    // Field & Bench
    field: 'Field',
    bench: 'Bench',
    staged: 'Staged',
    drag_or_tap_hint: 'Drag or tap player to stage sub',
    empty_bench: 'No players on the bench',
    stage_sub: 'Stage Sub',
    move_to_bench: 'Move to Bench',
    choose_sub_from_bench: 'Choose Sub from Bench...',
    player_time: 'Playing Time',

    // Staged Subs
    staged_subs_title: 'Staged Substitutions',
    execute_subs: 'Execute Substitutions',
    cancel_all: 'Cancel All',
    in: 'In',
    out: 'Out',
    played: 'played',

    // Timeline
    substitution_history: 'Substitution Timeline',
    no_subs_yet: 'No substitutions recorded yet during this match.',
    clear_history: 'Clear History',
    match_time: 'Match Time',
    clock_time: 'Clock',

    // Roster
    roster_title: 'Roster Management',
    team_name: 'Team Name',
    enter_team_name: 'Enter team name...',
    total_players: 'Total Players',
    starters: 'Starters',
    add_player: 'Add Player',
    player_name: 'Player Name',
    jersey_num: 'Jersey #',
    position: 'Position',
    color: 'Color',
    load_preset: 'Load Preset',

    // Printable PDF Report
    match_report_title: 'Official Match Sheet & Lineup',
    match_date: 'Date',
    match_duration: 'Total Match Duration',
    starting_lineup: 'Starting Lineup (On Field)',
    bench_reserves: 'Bench & Substitutes',
    print_or_save_pdf: 'Print / Save as PDF',
    download_html: 'Download HTML Report',

    // Reset Modal
    reset_modal_title: 'Reset All Player Timers?',
    reset_modal_desc: 'This will reset all accumulated game-time for every player back to 00:00 and reset the match clock. This action cannot be undone.',
    confirm_reset: 'Yes, Reset All Timers',

    // PWA & Updates
    app_updates: 'App Updates',
    update_ready: 'App Update Ready',
    update_desc: 'A new version of CoachSub is available',
    update_now: 'Update Now',
    check_updates: 'Check for Updates',
    checking: 'Checking for updates...',
    up_to_date: 'App is up to date',
    install_app: 'Install CoachSub',
  },

  fr: {
    // Nav & Common
    settings: 'Paramètres',
    roster: 'Effectif',
    timeline: 'Chronologie',
    printPdf: 'Imprimer / Exporter PDF',
    backupTransfer: 'Sauvegarde & Transfert',
    resetTimers: 'Réinitialiser les chronos',
    reset: 'Réinitialiser',
    flipField: 'Inverser le terrain',
    goal: 'But',
    halfway: 'Milieu',
    close: 'Fermer',
    cancel: 'Annuler',
    save: 'Enregistrer',
    confirm: 'Confirmer',
    delete: 'Supprimer',
    loading: 'Chargement...',

    // Match Clock
    matchClock: 'Chronomètre du match',
    startClock: 'Démarrer',
    pauseClock: 'Pause',
    resetClock: 'Remise à zéro 00:00',
    period: 'Période',
    period_1st_half: '1ère Mi-temps',
    period_2nd_half: '2ème Mi-temps',
    period_extra_time: 'Prolongations',
    period_extra_time_1: 'Prolongation 1',
    period_extra_time_2: 'Prolongation 2',
    period_sudden_death: 'Mort subite',
    period_penalties: 'Tirs au but',
    period_1st_per: '1ère Période',
    period_2nd_per: '2ème Période',
    period_3rd_per: '3ème Période',
    period_ot: 'Prolongation',
    period_shootout: 'Fusillade',
    period_1st_qtr: '1er Quart',
    period_2nd_qtr: '2ème Quart',
    period_3rd_qtr: '3ème Quart',
    period_4th_qtr: '4ème Quart',

    // Sports
    sport_soccer: 'Football',
    sport_hockey: 'Hockey sur glace',
    sport_lacrosse: 'Crosse',
    sport_field_hockey: 'Hockey sur gazon',
    sport_rugby: 'Rugby',
    sport_select_prompt: 'Choisir le sport',
    sport_change_warning: 'Changer de sport modifie le traçage du terrain et le format des périodes.',
    load_preset_roster: 'Charger l’effectif type pour ce sport',
    load_preset_confirm: 'Voulez-vous également charger l’équipe type pour ce sport ?',

    // Settings Modal
    settings_title: 'Paramètres & Préférences',
    language: 'Langue',
    field_sport: 'Sport & Terrain',
    goal_orientation: 'Côté du but',
    goal_left: 'But à gauche (Attaque vers la droite)',
    goal_right: 'But à droite (Attaque vers la gauche)',
    sound_effects: 'Effets sonores (Sifflet)',
    sound_enabled: 'Audio activé',
    sound_muted: 'Muet',
    app_info: 'Informations sur l’application',
    version: 'Version',
    offline_ready: 'Fonctionne hors-ligne (PWA)',

    // Field & Bench
    field: 'Terrain',
    bench: 'Remplaçants',
    staged: 'En attente',
    drag_or_tap_hint: 'Glissez ou touchez un joueur pour préparer un changement',
    empty_bench: 'Aucun joueur sur le banc',
    stage_sub: 'Préparer changement',
    move_to_bench: 'Mettre sur le banc',
    choose_sub_from_bench: 'Choisir un remplaçant...',
    player_time: 'Temps de jeu',

    // Staged Subs
    staged_subs_title: 'Changements en attente',
    execute_subs: 'Effectuer les changements',
    cancel_all: 'Tout annuler',
    in: 'Entrée',
    out: 'Sortie',
    played: 'joué',

    // Timeline
    substitution_history: 'Chronologie des changements',
    no_subs_yet: 'Aucun changement enregistré pour ce match.',
    clear_history: 'Effacer l’historique',
    match_time: 'Temps de jeu',
    clock_time: 'Heure',

    // Roster
    roster_title: 'Gestion de l’effectif',
    team_name: 'Nom de l’équipe',
    enter_team_name: 'Entrez le nom de l’équipe...',
    total_players: 'Total joueurs',
    starters: 'Titulaires',
    add_player: 'Ajouter un joueur',
    player_name: 'Nom du joueur',
    jersey_num: 'N° maillot',
    position: 'Poste',
    color: 'Couleur',
    load_preset: 'Effectif type',

    // Printable PDF Report
    match_report_title: 'Feuille de match officielle',
    match_date: 'Date',
    match_duration: 'Durée totale du match',
    starting_lineup: 'Titulaires (Sur le terrain)',
    bench_reserves: 'Remplaçants & Réserve',
    print_or_save_pdf: 'Imprimer / Sauvegarder en PDF',
    download_html: 'Télécharger le rapport HTML',

    // Reset Modal
    reset_modal_title: 'Réinitialiser tous les chronos ?',
    reset_modal_desc: 'Tous les temps de jeu cumulés des joueurs seront remis à 00:00 ainsi que le chronomètre du match. Cette action est irréversible.',
    confirm_reset: 'Oui, réinitialiser tous les chronos',

    // PWA & Updates
    app_updates: 'Mises à jour',
    update_ready: 'Mise à jour prête',
    update_desc: 'Une nouvelle version de CoachSub est disponible',
    update_now: 'Mettre à jour maintenant',
    check_updates: 'Vérifier les mises à jour',
    checking: 'Vérification en cours...',
    up_to_date: 'L’application est à jour',
    install_app: 'Installer CoachSub',
  },

  es: {
    // Nav & Common
    settings: 'Ajustes',
    roster: 'Plantilla',
    timeline: 'Cronología',
    printPdf: 'Imprimir / Exportar PDF',
    backupTransfer: 'Copia y Transferencia',
    resetTimers: 'Reiniciar cronómetros',
    reset: 'Reiniciar',
    flipField: 'Invertir campo',
    goal: 'Portería',
    halfway: 'Medio campo',
    close: 'Cerrar',
    cancel: 'Cancelar',
    save: 'Guardar',
    confirm: 'Confirmar',
    delete: 'Eliminar',
    loading: 'Cargando...',

    // Match Clock
    matchClock: 'Reloj del partido',
    startClock: 'Iniciar',
    pauseClock: 'Pausa',
    resetClock: 'Reiniciar reloj a 00:00',
    period: 'Período',
    period_1st_half: '1er Tiempo',
    period_2nd_half: '2do Tiempo',
    period_extra_time: 'Prórroga',
    period_extra_time_1: 'Prórroga 1',
    period_extra_time_2: 'Prórroga 2',
    period_sudden_death: 'Muerte súbita',
    period_penalties: 'Penaltis',
    period_1st_per: '1er Periodo',
    period_2nd_per: '2do Periodo',
    period_3rd_per: '3er Periodo',
    period_ot: 'Tiempo extra',
    period_shootout: 'Tanda de penaltis',
    period_1st_qtr: '1er Cuarto',
    period_2nd_qtr: '2do Cuarto',
    period_3rd_qtr: '3er Cuarto',
    period_4th_qtr: '4to Cuarto',

    // Sports
    sport_soccer: 'Fútbol',
    sport_hockey: 'Hockey sobre hielo',
    sport_lacrosse: 'Lacrosse',
    sport_field_hockey: 'Hockey sobre hierba',
    sport_rugby: 'Rugby',
    sport_select_prompt: 'Seleccionar deporte',
    sport_change_warning: 'Cambiar de deporte actualiza las líneas del campo y los períodos.',
    load_preset_roster: 'Cargar plantilla tipo para este deporte',
    load_preset_confirm: '¿Desea también cargar la alineación inicial recomendada para este deporte?',

    // Settings Modal
    settings_title: 'Ajustes y Preferencias',
    language: 'Idioma',
    field_sport: 'Deporte y Terreno de Juego',
    goal_orientation: 'Lado de la portería',
    goal_left: 'Portería a la izquierda (Ataque a la derecha)',
    goal_right: 'Portería a la derecha (Ataque a la izquierda)',
    sound_effects: 'Efectos de sonido (Silbato)',
    sound_enabled: 'Audio activado',
    sound_muted: 'Silenciado',
    app_info: 'Información de la aplicación',
    version: 'Versión',
    offline_ready: 'Modo sin conexión listo (PWA)',

    // Field & Bench
    field: 'Campo',
    bench: 'Banquillo',
    staged: 'En espera',
    drag_or_tap_hint: 'Arrastra o toca un jugador para preparar el cambio',
    empty_bench: 'No hay jugadores en el banquillo',
    stage_sub: 'Preparar cambio',
    move_to_bench: 'Mover al banquillo',
    choose_sub_from_bench: 'Elegir del banquillo...',
    player_time: 'Tiempo jugado',

    // Staged Subs
    staged_subs_title: 'Cambios en espera',
    execute_subs: 'Realizar cambios',
    cancel_all: 'Cancelar todo',
    in: 'Entra',
    out: 'Sale',
    played: 'jugados',

    // Timeline
    substitution_history: 'Historial de cambios',
    no_subs_yet: 'Aún no hay cambios registrados en este partido.',
    clear_history: 'Borrar historial',
    match_time: 'Minuto',
    clock_time: 'Hora',

    // Roster
    roster_title: 'Gestión de plantilla',
    team_name: 'Nombre del equipo',
    enter_team_name: 'Introduce el nombre del equipo...',
    total_players: 'Total jugadores',
    starters: 'Titulares',
    add_player: 'Añadir jugador',
    player_name: 'Nombre del jugador',
    jersey_num: 'Dorsal Nº',
    position: 'Posición',
    color: 'Color',
    load_preset: 'Plantilla tipo',

    // Printable PDF Report
    match_report_title: 'Acta oficial del partido',
    match_date: 'Fecha',
    match_duration: 'Duración total del partido',
    starting_lineup: 'Alineación titular (En campo)',
    bench_reserves: 'Banquillo y Sustitutos',
    print_or_save_pdf: 'Imprimir / Guardar en PDF',
    download_html: 'Descargar informe HTML',

    // Reset Modal
    reset_modal_title: '¿Reiniciar todos los cronómetros?',
    reset_modal_desc: 'Esto restablecerá el tiempo de juego de todos los jugadores a 00:00 y reiniciará el reloj del partido. Esta acción no se puede deshacer.',
    confirm_reset: 'Sí, reiniciar todos los cronómetros',

    // PWA & Updates
    app_updates: 'Actualizaciones',
    update_ready: 'Actualización lista',
    update_desc: 'Hay una nueva versión de CoachSub disponible',
    update_now: 'Actualizar ahora',
    check_updates: 'Buscar actualizaciones',
    checking: 'Comprobando...',
    up_to_date: 'La app está actualizada',
    install_app: 'Instalar CoachSub',
  },

  zh: {
    // Nav & Common
    settings: '设置',
    roster: '阵容名单',
    timeline: '换人记录',
    printPdf: '打印 / 导出PDF',
    backupTransfer: '备份与传输',
    resetTimers: '重置计时器',
    reset: '重置',
    flipField: '翻转球场',
    goal: '球门',
    halfway: '中线',
    close: '关闭',
    cancel: '取消',
    save: '保存',
    confirm: '确认',
    delete: '删除',
    loading: '加载中...',

    // Match Clock
    matchClock: '比赛计时',
    startClock: '开始',
    pauseClock: '暂停',
    resetClock: '重置时钟至 00:00',
    period: '节次',
    period_1st_half: '上半场',
    period_2nd_half: '下半场',
    period_extra_time: '加时赛',
    period_extra_time_1: '加时赛上半场',
    period_extra_time_2: '加时赛下半场',
    period_sudden_death: '金球决胜',
    period_penalties: '点球大战',
    period_1st_per: '第一节',
    period_2nd_per: '第二节',
    period_3rd_per: '第三节',
    period_ot: '加时',
    period_shootout: '点球决胜',
    period_1st_qtr: '第一节',
    period_2nd_qtr: '第二节',
    period_3rd_qtr: '第三节',
    period_4th_qtr: '第四节',

    // Sports
    sport_soccer: '足球',
    sport_hockey: '冰球',
    sport_lacrosse: '长曲棍球',
    sport_field_hockey: '曲棍球',
    sport_rugby: '橄榄球',
    sport_select_prompt: '选择场地运动',
    sport_change_warning: '切换运动将更新球场线条标记与比赛节次。',
    load_preset_roster: '加载此运动的标准阵容预设',
    load_preset_confirm: '是否同时加载此运动的标准首发阵容？',

    // Settings Modal
    settings_title: '系统设置与偏好',
    language: '界面语言',
    field_sport: '运动项目与球场',
    goal_orientation: '球门防守方向',
    goal_left: '球门在左侧 (向右进攻)',
    goal_right: '球门在右侧 (向左进攻)',
    sound_effects: '提示音效 (哨声)',
    sound_enabled: '已开启音效',
    sound_muted: '静音',
    app_info: '应用信息',
    version: '版本',
    offline_ready: '离线就绪 (PWA)',

    // Field & Bench
    field: '场上球员',
    bench: '替补席',
    staged: '待换人',
    drag_or_tap_hint: '拖拽或点击球员以安排换人',
    empty_bench: '替补席无球员',
    stage_sub: '安排换人',
    move_to_bench: '移至替补席',
    choose_sub_from_bench: '从替补席选择换人...',
    player_time: '出场时间',

    // Staged Subs
    staged_subs_title: '待执行换人名单',
    execute_subs: '执行换人',
    cancel_all: '取消全部',
    in: '上场',
    out: '下场',
    played: '出场',

    // Timeline
    substitution_history: '换人时间线历史',
    no_subs_yet: '本场比赛尚无换人记录。',
    clear_history: '清空历史记录',
    match_time: '比赛时间',
    clock_time: '真实时间',

    // Roster
    roster_title: '阵容名单管理',
    team_name: '球队名称',
    enter_team_name: '输入球队名称...',
    total_players: '球员总数',
    starters: '首发人数',
    add_player: '添加球员',
    player_name: '球员姓名',
    jersey_num: '球衣号码',
    position: '位置',
    color: '代表色',
    load_preset: '预设阵容',

    // Printable PDF Report
    match_report_title: '官方比赛记录与出场表',
    match_date: '比赛日期',
    match_duration: '比赛总时长',
    starting_lineup: '首发阵容 (场上)',
    bench_reserves: '替补名单',
    print_or_save_pdf: '打印 / 保存为PDF',
    download_html: '下载HTML比赛报告',

    // Reset Modal
    reset_modal_title: '重置所有球员计时器？',
    reset_modal_desc: '此操作将把所有球员累计的出场时间归零并重置比赛时钟。此操作不可撤销。',
    confirm_reset: '确认重置所有计时器',

    // PWA & Updates
    app_updates: '应用更新',
    update_ready: '应用更新已就绪',
    update_desc: 'CoachSub 有新版本可供安装',
    update_now: '立即更新',
    check_updates: '检查更新',
    checking: '正在检查更新...',
    up_to_date: '应用已是最新版本',
    install_app: '安装 CoachSub',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(key: TranslationKey, lang: Language = 'en'): string {
  const dict = translations[lang] || translations.en;
  return dict[key] || translations.en[key] || key;
}
