# ZIP STRUCTURE (read-only reference)

Source archive: `dnx-v1.0.0 (1).zip`. File and folder names below are reproduced from the uploaded archive.

```text
├── .eslintrc.cjs
├── .gitignore
├── .prettierignore
├── .prettierrc.cjs
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public/
│   └── dnx.ico
├── src/
│   ├── App.tsx
│   ├── assets/
│   │   └── images/
│   │       ├── avatars/
│   │       │   ├── avatar1.png
│   │       │   ├── avatar2.png
│   │       │   ├── avatar3.png
│   │       │   ├── avatar4.png
│   │       │   ├── avatar5.png
│   │       │   ├── avatar6.png
│   │       │   ├── avatar7.png
│   │       │   └── avatar8.png
│   │       ├── help-center.png
│   │       ├── logo.png
│   │       └── thumbs/
│   │           ├── thumb1.png
│   │           ├── thumb2.png
│   │           ├── thumb3.png
│   │           ├── thumb4.png
│   │           ├── thumb5.png
│   │           ├── thumb6.png
│   │           ├── thumb7.png
│   │           └── thumb8.png
│   ├── components/
│   │   ├── base/
│   │   │   ├── IconifyIcon.tsx
│   │   │   ├── Image.tsx
│   │   │   ├── ReactEchart.tsx
│   │   │   └── ReactSwiper.tsx
│   │   ├── common/
│   │   │   ├── DataGridFooter.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── SliderWrapper.tsx
│   │   ├── hooks/
│   │   │   └── userResizeObserver.ts
│   │   ├── loader/
│   │   │   ├── PageLoader.tsx
│   │   │   └── Splash.tsx
│   │   └── sections/
│   │       └── dashboard/
│   │           ├── TaskToday.tsx
│   │           ├── WeekCalendar.tsx
│   │           ├── activity/
│   │           │   ├── Activity.tsx
│   │           │   └── ActivityChart.tsx
│   │           ├── monthly-mentors/
│   │           │   ├── MentorCard.tsx
│   │           │   └── MonthlyMentors.tsx
│   │           ├── running-task/
│   │           │   ├── RunningTask.tsx
│   │           │   └── RunningTaskChart.tsx
│   │           ├── task-overview/
│   │           │   ├── ActionMenu.tsx
│   │           │   ├── TaskOverview.tsx
│   │           │   └── TaskOverviewTable.tsx
│   │           └── upcoming-task/
│   │               ├── TaskCard.tsx
│   │               └── UpcomingTask.tsx
│   ├── data/
│   │   ├── images.ts
│   │   ├── mentors.ts
│   │   ├── taskOverview.ts
│   │   └── tasks.ts
│   ├── layouts/
│   │   ├── auth-layout/
│   │   │   └── index.tsx
│   │   └── main-layout/
│   │       ├── index.tsx
│   │       ├── sidebar/
│   │       │   ├── DrawerItems.tsx
│   │       │   ├── Sidebar.tsx
│   │       │   └── list-items/
│   │       │       ├── CollapseListItem.tsx
│   │       │       └── ListItem.tsx
│   │       └── topbar/
│   │           ├── LanguageSelect.tsx
│   │           ├── ProfileMenu.tsx
│   │           └── Topbar.tsx
│   ├── main.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Error404.tsx
│   │   └── authentication/
│   │       ├── Signin.tsx
│   │       └── Signup.tsx
│   ├── routes/
│   │   ├── paths.ts
│   │   ├── router.tsx
│   │   └── sitemap.ts
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── components/
│   │   │   ├── button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── ButtonBase.tsx
│   │   │   │   ├── IconButton.tsx
│   │   │   │   └── Toolbar.tsx
│   │   │   ├── card/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── CardActions.tsx
│   │   │   │   ├── CardContent.tsx
│   │   │   │   ├── CardHeader.tsx
│   │   │   │   └── CardMedia.tsx
│   │   │   ├── data-display/
│   │   │   │   ├── Avatar.tsx
│   │   │   │   ├── AvatarGroup.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Chip.tsx
│   │   │   │   └── Divider.tsx
│   │   │   ├── data-grid/
│   │   │   │   └── DataGrid.tsx
│   │   │   ├── input/
│   │   │   │   ├── Checkbox.tsx
│   │   │   │   ├── FilledInput.tsx
│   │   │   │   ├── FormControlLabel.tsx
│   │   │   │   ├── InputAdornment.tsx
│   │   │   │   ├── InputBase.tsx
│   │   │   │   ├── OutlinedInput.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   └── Slider.tsx
│   │   │   ├── layout/
│   │   │   │   └── Stack.tsx
│   │   │   ├── list/
│   │   │   │   ├── Collapse.tsx
│   │   │   │   ├── List.tsx
│   │   │   │   ├── ListItemButton.tsx
│   │   │   │   ├── ListItemIcon.tsx
│   │   │   │   ├── ListItemText.tsx
│   │   │   │   └── MenuItem.tsx
│   │   │   ├── navigation/
│   │   │   │   ├── Drawer.tsx
│   │   │   │   └── Link.tsx
│   │   │   ├── pagination/
│   │   │   │   └── PaginationItem.tsx
│   │   │   ├── surface/
│   │   │   │   └── Paper.tsx
│   │   │   └── utils/
│   │   │       └── CssBaseline.tsx
│   │   ├── palette.ts
│   │   ├── shadows.ts
│   │   ├── styles/
│   │   │   ├── echart.ts
│   │   │   ├── scrollbar.ts
│   │   │   └── simplebar.ts
│   │   ├── theme.ts
│   │   └── typography.ts
│   └── types/
│       └── custom.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
